import { UserModule } from './../../components/user/user.module';
import { VitalSignsModule } from './../../components/vital-signs/vital-signs.module';
import { PatientModule } from './../../components/patient/patient.module';
import { HeaderModule } from './../../components/header/header.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderModule,
    PatientModule,
    VitalSignsModule,
    UserModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
