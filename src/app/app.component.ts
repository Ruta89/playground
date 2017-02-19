import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';


// import { LoginPage } from '../pages/login/login';
 import { TabsPage } from '../pages/tabs/tabs';
// import { SignupPage } from '../pages/signup/signup';
// import { PracaPage } from '../pages/praca/praca';
// import { ProfilePage } from '../pages/profile/profile';

import { LandingPage } from '../pages/landing/landing';
import { InwestycjePage } from '../pages/inwestycje/inwestycje';
import { MapPage } from '../pages/map/map';
import { ListPage } from '../pages/list/list';
import { UploadPage } from '../pages/upload/upload';

// Importing provider
import { AngularFire } from 'angularfire2';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{ title: string, icon: string, component: any }>;

  constructor(public platform: Platform, af: AngularFire) {

    this.initializeApp();

    this.pages = [
      { title: 'Start', icon: 'home', component: TabsPage },
      { title: 'Inwestycje', icon: 'list-box', component: InwestycjePage },
      { title: 'Map', icon: 'list-box', component: MapPage },
      { title: 'List', icon: 'list-box', component: ListPage },
      { title: 'Upload', icon: 'list-box', component: UploadPage }
    ];

    af.auth.subscribe(user => {
      if (user) {
        this.rootPage = LandingPage; // bylo HomePage
      } else {
        this.rootPage = TabsPage;
      }
    });
  }

    initializeApp() {

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

      openPage(page) {
    this.nav.setRoot(page.component);
  }
  

}
