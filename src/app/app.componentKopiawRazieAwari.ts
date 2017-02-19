import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';


import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { SignupPage } from '../pages/signup/signup';
import { PracaPage } from '../pages/praca/praca';
import { ProfilePage } from '../pages/profile/profile';
// Importing provider
import { AngularFire } from 'angularfire2';

//import firebase from 'firebase';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage: any = TabsPage;
  //rootPage: any = HomePage;

  constructor(platform: Platform, af: AngularFire) {

    af.auth.subscribe(user => {
      if (user) {
        this.rootPage = TabsPage;
      } else {
        this.rootPage = LoginPage;
      }
    });


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      StatusBar.hide();
      //StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
