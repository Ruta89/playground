import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Ustawienia page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ustawienia',
  templateUrl: 'ustawienia.html'
})
export class UstawieniaPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello UstawieniaPage Page');
  }

}
