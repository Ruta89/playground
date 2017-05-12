import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DolezychPage } from './dolezych';

@NgModule({
  declarations: [
    DolezychPage,
  ],
  imports: [
    IonicPageModule.forChild(DolezychPage),
  ],
  exports: [
    DolezychPage
  ]
})
export class DolezychPageModule {}
