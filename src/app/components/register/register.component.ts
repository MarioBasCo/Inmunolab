import { PatientService } from './../../services/patient.service';
import { IdentificacionValidation } from './../../utils/identificacion-validation';
import { ModalController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private serPac: PatientService,
    private toastController: ToastController,
    private fb: FormBuilder, 
    private modal: ModalController) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      identificacion: ['', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(10),
        IdentificacionValidation.isEcuadorian]
      ],
      nombres: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150), Validators.pattern("[A-Za-zÁÉÍÓÚáéíóúñÑ ]+")]],
      apellidos: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150), Validators.pattern("[A-Za-zÁÉÍÓÚáéíóúñÑ ]+")]],
      correo: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      direccion: ['', [Validators.required, Validators.maxLength(250)]]
    });
  }

  onSubmit() {
    const data = {
      pa_cedula : this.form.get('identificacion')?.value,
      pa_nombres: this.form.get('nombres')?.value,
      pa_apellidos: this.form.get('apellidos')?.value,
      pa_correo: this.form.get('correo')?.value,
      pa_direccion: this.form.get('direccion')?.value,
      pa_estado: 1
    }
    console.log(data);
    this.serPac.validarPaciente(data.pa_cedula).subscribe(resp => {
      if(resp.status == false){
        this.serPac.nuevoPaciente(JSON.stringify(data)).subscribe(resp => {
          if(resp.status == true){
            this.presentToast(resp.message, 'success');
            this.dismiss();
          } else {
            this.presentToast(resp.message, 'danger');
          }
        });
      } else {
        console.log(resp.message);
        this.presentToast(resp.message, 'danger');
      }
    });
    
  }

  dismiss() {
    this.modal.dismiss({
      'dismissed': true
    });
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
