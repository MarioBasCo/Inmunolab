import { LstorageService } from './../../services/lstorage.service';
import { Router } from '@angular/router';
import { CommunicationService } from './../../services/communication.service';
import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  type: string = "body";
  user: any;

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private serParams: CommunicationService,
    private serStorage: LstorageService,
  ) { 
/*     this.serParams.$getObjectSource.subscribe(data => {
      //this.type = JSON.stringify(data);
      console.log(data)
    }); */
  }

  ngOnInit() {
    this.user = this.serStorage.get('user');
    this.serParams.enviarObject(this.type);
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    const segment = ev.detail.value;
    this.serParams.enviarObject(segment);
    this.desplazarScroll(segment);
  }

  desplazarScroll(value: string){
    document.getElementById("segment-" + value)?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    });
  }

  cerrarSesion(){
    this.alertCtrl.create({
      header: "Cerrar Sesión",
      message: "¿Esta Seguro de Cerrar Sesión?",
      buttons: [
        {
          text: "SÍ",
          handler: () => {
            this.serStorage.clear();
            location.href = '/login';
            this.router.dispose();
          }
        },
        { text: "NO" }
      ]
    }).then(alertEl => alertEl.present());
  }

  activarSegment(){
    if (this.serStorage.get('paciente')) {
      return false;
    } else {
      return true;
    }
  }
}
