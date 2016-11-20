import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-inwestycje',
  templateUrl: 'inwestycje.html'
})
export class InwestycjePage {
  inwestycje: string = "planowane";
  isAndroid: boolean = false;

  constructor(platform: Platform, public navCtrl: NavController) {
    this.isAndroid = platform.is('android');
  }

  ionViewDidLoad() {
    console.log('Hello InwestycjePage Page');
  }

}
