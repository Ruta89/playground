import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-praca',
  templateUrl: 'praca.html'
})
export class PracaPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello PracaPage Page');
  }

}
