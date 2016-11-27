import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public af: AngularFire) { }



  goToLoginPage() {
    this.navCtrl.push(LoginPage);
  }

  logoutUser(): any {
    return this.af.auth.logout();
    }

  ionViewDidLoad() {
    console.log('Hello HomePage Page');
  }

}
