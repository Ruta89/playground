import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { AuthData } from '../../providers/auth-data';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public authData: AuthData) {
    this.navCtrl = navCtrl;
   }



  goToProfile() {
    this.navCtrl.push(ProfilePage);
  }

  goToLoginPage() {
    this.navCtrl.push(LoginPage);
  }

  logoutUser(): any {
    this.authData.signOut().then(()=>{
      this.navCtrl.push(LoginPage);
    })
    //return this.af.auth.logout();
    }

  ionViewDidLoad() {
    console.log('Hello HomePage Page');
  }

}
