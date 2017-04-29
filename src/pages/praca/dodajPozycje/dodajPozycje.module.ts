import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DodajPozycjePage } from './dodajPozycje';

@NgModule({
  declarations: [
    DodajPozycjePage,
  ],
  imports: [
    IonicPageModule.forChild(DodajPozycjePage),
  ],
  exports: [
    DodajPozycjePage
  ]
})
export class DodajPozycjePageModule {}
