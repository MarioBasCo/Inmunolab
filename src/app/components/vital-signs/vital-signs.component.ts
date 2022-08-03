import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { AlertController, ToastController } from '@ionic/angular';
import { IPaciente } from './../../interfaces/interfaces';
import { LstorageService } from './../../services/lstorage.service';
import { PatientService } from './../../services/patient.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/services/communication.service';
import { Subscription, Observable } from 'rxjs';



@Component({
  selector: 'app-vital-signs',
  templateUrl: './vital-signs.component.html',
  styleUrls: ['./vital-signs.component.scss'],
})
export class VitalSignsComponent implements OnInit {
  tipos: any[] = [];
  paciente: IPaciente;
  pulso: number = 0;
  altura: number = 0;
  observacion: string = '';
  bleStatus: boolean = false;
  bluetoothIsScanning: boolean = false;
  connection: boolean = false;
  subscription: Subscription;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private bluetoothSerial: BluetoothSerial,
    private serPac: PatientService,
    private serStorage: LstorageService,
    private alertCtrl: AlertController,
    private serParams: CommunicationService,
    private toastController: ToastController
  ) {
    try {
      this.bluetoothSerial.isEnabled().then(() => {
        this.changeDetectorRef.detectChanges();
        this.bleStatus = true;
        this.conectar();
        this.subscription = this.recibirDatos();
      }).catch((error) => {
        console.error(error);
        this.changeDetectorRef.detectChanges();
        this.bleStatus = false;
        this.bluetoothSerial.enable().then(() => {
          this.changeDetectorRef.detectChanges();
          this.bleStatus = true;
          this.conectar();
          this.subscription = this.recibirDatos();
        }).catch((error) => {
          console.error(error);
          this.changeDetectorRef.detectChanges();
          this.bleStatus = false;
        })
      });
    } catch (error) {
      console.error(error);
    }
  }

  recibirDatos(): Subscription {
    return this.bluetoothSerial.subscribe('\n').subscribe((resp) => {
      console.log(`Dato Leido ${JSON.parse(JSON.stringify(resp))}`);
      let data = JSON.parse(JSON.stringify(resp));
      let indice = data.indexOf(',');
      this.pulso = data.substring(0, indice);
      this.altura = data.substring(indice + 1, data.length);
      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnInit() {
    this.serPac.getTiposExamenes().subscribe(
      data => {
        this.tipos = data.map(d => {
          const tipo = { id_tipo_exam: d.id_tipo_exam, detalle_exam: d.detalle_exam }
          tipo['estado'] = false
          return tipo;
        });
        console.log(this.tipos);
      }
    );
    if (this.serStorage.get('paciente')) {
      this.paciente = this.serStorage.get('paciente');
    }
  }

  leerDatos() {
    this.subscription.unsubscribe();
    this.presentToast('Datos capturados con éxito', 'success');
  }

  conectar() {
    this.bluetoothSerial.connect('98:D3:31:F6:1B:C0').subscribe(() => {
      console.log("Se ha conectado correctamente");
      this.bluetoothIsScanning = true;
    }, (error) => {
      console.error(error);
      this.bluetoothIsScanning = false;
    });
  }

  reconectar() {
    this.bluetoothSerial.connect('98:D3:31:F6:1B:C0').subscribe(() => {
      console.log("Se ha conectado correctamente");
      this.bluetoothIsScanning = true;
    }, (error) => {
      console.error(error);
      this.bluetoothIsScanning = false;
      this.presentToast('Error no se pudo conectar con los sensores, revise las conexiones', 'danger');
    });
  }

  scan() {
    this.subscription = this.recibirDatos();
    this.presentToast('Sensores activos', 'success');
  }

  cancelar() {
    this.alertCtrl.create({
      header: "Cancelar Registro",
      message: "¿Esta Seguro de Cancelar?",
      buttons: [
        {
          text: "Sí",
          handler: () => {
            this.serStorage.remove('paciente');
            this.serParams.enviarObject('body');
            //window.location.reload();
          }
        },
        { text: "No" }
      ]
    }).then(alertEl => alertEl.present());
  }

  guardar() {
    if (this.subscription.closed == false) {
      this.presentToast('Por favor capture los datos del sensor', 'warning');
      return;
    } else if (this.tipos.filter(d => d.estado == true).length == 0) {
      this.presentToast('Escoja los examenes a realizar', 'warning');
      return;
    }
    //console.log(this.tipos.filter(d => d.estado == true))
    const dataMedidas = {
      id_paciente: this.paciente?.id_paciente,
      fecha_toma_medidas: new Date().toISOString().slice(0, 10),
      me_pulso: this.pulso,
      me_altura: this.altura,
      me_observaciones: this.observacion
    }

    const dataExam = {
      id_paciente: this.paciente?.id_paciente,
      fecha_examenes: new Date().toISOString().slice(0, 10),
      estado_examenes: 1,
      examenes: this.tipos.filter(d => d.estado == true)
    }
    const data = {
      medidas: dataMedidas,
      examenes: dataExam
    }
    this.serPac.regExamenes(JSON.stringify(data)).subscribe(resp => {
      console.log(resp);
      if (resp.status) {
        this.presentToast(resp.message, 'success');
        this.serStorage.remove('paciente');
        this.serParams.enviarObject('body');
        //window.location.reload();
      } else {
        this.presentToast(resp.message, 'danger');
      }
    });
    console.log(dataMedidas, dataExam)
  }

  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message,
      duration: 3500,
      color,
    });
    toast.present();
  }
}
