import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InwestycjePage } from '../inwestycje/inwestycje';
import { HomePage } from '../home/home';
import { PracaPage } from '../praca/praca';
import { StartPage } from '../start/start';
import { MyTabPage } from '../my-tab-page/my-tab-page';
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

  constructor(public navCtrl: NavController) {
  }

  goToInwestycje(){
    this.navCtrl.push(InwestycjePage);
  }

  goToPraca(){
    this.navCtrl.push(PracaPage);
  }

  goToHome(){
    this.navCtrl.push(HomePage);
  }

  goToStart(){
    this.navCtrl.push(StartPage);
  }


  ionViewDidLoad() {
    console.log('Hello MenuPage Page');
  }

}
