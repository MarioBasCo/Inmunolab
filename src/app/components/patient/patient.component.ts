import { LstorageService } from './../../services/lstorage.service';
import { IPaciente } from './../../interfaces/interfaces';
import { PatientService } from './../../services/patient.service';
import { RegisterComponent } from './../register/register.component';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
})
export class PatientComponent implements OnInit {
  textBusqueda: string = '';
  showPlaceholder: boolean = false;
  loaded: boolean = false;
  data: any;
  paciente: IPaciente;
  message: string = '';

  constructor(
    private modal: ModalController, 
    private serStorage: LstorageService,
    private serPaciente: PatientService) { }

  ngOnInit() {}

  buscar(){
    this.message = '';
    if (this.textBusqueda != "") {
      console.log(this.textBusqueda);
      this.showPlaceholder = true;
      this.loaded = false;
      this.serPaciente.buscarPaciente(this.textBusqueda).subscribe(
        resp => {
          if(resp?.['id_paciente']){
            this.paciente = JSON.parse(JSON.stringify(resp));
            console.log(this.paciente);
          } else {
            this.paciente = null;
            this.message = JSON.stringify(resp);
          }
        }
      );
      setTimeout(() => {
        this.showPlaceholder = false;
        this.loaded = true;
      }, 950);
    } else {
      return;
    }
  }

  reset(){
    if(this.textBusqueda == ''){
      this.paciente = null;
      this.message = '';
      this.loaded = false;
    }
  }

  limpiar(){
    this.textBusqueda = "";
    this.loaded = false;
  }

  seleccionar(data: any){
    console.log("seleccionar: ", data)
    this.serStorage.set('paciente', data);
  }

  async abrirModalRegistro(){
    const modal = await this.modal.create({
      component: RegisterComponent,
      backdropDismiss: true,
      cssClass: 'small-modal'
    });

    await modal.present();
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
