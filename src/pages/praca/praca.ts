import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Praca page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
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
