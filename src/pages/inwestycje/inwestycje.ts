import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-inwestycje',
  templateUrl: 'inwestycje.html'
})
export class InwestycjePage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello InwestycjePage Page');
  }

}
