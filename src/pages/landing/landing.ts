import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
//import { HomePage } from '../home/home';
//import { InwestycjePage } from '../inwestycje/inwestycje';
import { TabsPage } from '../tabs/tabs';
import { AuthData } from '../../providers/auth-data';

@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {

  constructor(public navCtrl: NavController, public authData: AuthData,
    public loadingCtrl: LoadingController) {}

  goToLogin(){
    this.navCtrl.push(LoginPage);
  }

  goToBillList(){
    console.log('dodac sprawdzenie czy uzytkownik jest zalogowany w loading.ts');
    //  this.authData.anonymousLogin().then( user => {
          this.navCtrl.push(TabsPage);
    //  });
    
    let loading = this.loadingCtrl.create({
      dismissOnPageChange: true
    });
    loading.present();
  }
}
