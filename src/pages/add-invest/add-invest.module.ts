import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddInvestPage } from './add-invest';

@NgModule({
  declarations: [
    AddInvestPage,
  ],
  imports: [
    IonicPageModule.forChild(AddInvestPage),
  ],
  exports: [
    AddInvestPage
  ]
})
export class AddInvestPageModule {}
