import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { InwestycjePage } from '../pages/inwestycje/inwestycje';
import { ListPage } from '../pages/list/list';
import { UploadPage } from '../pages/upload/upload';

import { HomeMapPage } from '../pages/homemap/homemap';
import { TablicaPage } from '../pages/tablica/tablica';

// Importing provider
import { AngularFire } from 'angularfire2';

export interface PageInterface {
  title: string;
  icon: string;
  component: any;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, af: AngularFire) {

    const authListener = af.auth.subscribe(user => {
      if (user) {
        this.rootPage = TabsPage;
        authListener.unsubscribe();
      } else {
        this.rootPage = LoginPage;
        authListener.unsubscribe();
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });




    /*
        af.auth.subscribe(user => {
          if (user) {
            this.rootPage = LoginPage; 
          } else {
            this.rootPage = TabsPage;
          }
        });
          */
  }


  pages: PageInterface[] = [
    { title: 'Start', icon: 'home', component: TabsPage },
    { title: 'Dolezych', icon: 'home', component: 'DolezychPage' },
    { title: 'Tablica', icon: 'pen', component: TablicaPage },
    { title: 'Inwestycje', icon: 'list-box', component: InwestycjePage },
    { title: 'MapHome', icon: 'list-box', component: HomeMapPage },
    { title: 'List', icon: 'list-box', component: ListPage },
    { title: 'Upload', icon: 'list-box', component: UploadPage }
  ];

  openPage(page: PageInterface) {
    this.nav.setRoot(page.component);
  }


}
