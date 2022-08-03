import { LstorageService } from './../../services/lstorage.service';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  datosUser: any;
  user: string;
  clave: string;
  showPassword = false;
  passwordToggleIcon = 'eye-off-outline';

  constructor(
    private router: Router,
    private toastController: ToastController,
    private serLogin: LoginService,
    private serStorage: LstorageService
  ) { }

  ngOnInit() {
  }


  irRegistro() {
    this.router.navigate(['/signup']);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon == 'eye-off-outline') {
      this.passwordToggleIcon = 'eye-outline';
    } else {
      this.passwordToggleIcon = 'eye-off-outline';
    }
  }

  irApp() {
    if (this.user != '' && this.clave != '') {
      this.serLogin.iniciarSesion(this.user, this.clave).subscribe(resp => {
        console.log(resp);
        if (resp?.status == true) {
          this.serStorage.set('user', resp?.userdata);
          this.router.navigateByUrl('/home', { replaceUrl: true });
        } else {
          this.presentToast(resp?.message);
        }
      });
    }
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 3500,
      color: 'danger'
    });
    toast.present();
  }
}
