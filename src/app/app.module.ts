import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { InwestycjePage } from '../pages/inwestycje/inwestycje';
import { MenuPage } from '../pages/menu/menu';
import { PracaPage } from '../pages/praca/praca';
import { StartPage } from '../pages/start/start';
import { MyTabPage } from '../pages/my-tab-page/my-tab-page';
// Import the AF2 Module
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// AF2 Settings
export const firebaseConfig = {
      apiKey: "AIzaSyC1qu6GF1LX9MkgB7SS3pKJAfifvcMqojM",
      authDomain: "fir-aplikacja.firebaseapp.com",
      databaseURL: "https://fir-aplikacja.firebaseio.com",
      storageBucket: "firebase-aplikacja.appspot.com",
      messagingSenderId: "156754019211"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    InwestycjePage,
    MenuPage,
    PracaPage,
    StartPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    InwestycjePage,
    MenuPage,
    PracaPage,
    StartPage,
  ],
  providers: []  // AuthData, ProfileData, Data
})
export class AppModule {}
