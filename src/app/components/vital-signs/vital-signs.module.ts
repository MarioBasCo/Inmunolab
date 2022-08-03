import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VitalSignsComponent } from './vital-signs.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [VitalSignsComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
  ],
  exports: [VitalSignsComponent]
})
export class VitalSignsModule { }
