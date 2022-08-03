import { RegisterModule } from './../register/register.module';
import { FormsModule } from '@angular/forms';
import { PatientComponent } from './patient.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [PatientComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RegisterModule
  ],
  exports: [PatientComponent]
})
export class PatientModule { }
