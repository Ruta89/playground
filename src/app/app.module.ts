import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TodoPage } from '../pages/todo/todo';
import { InwestycjePage } from '../pages/inwestycje/inwestycje';
import { PracaPage } from '../pages/praca/praca';
import { TabsPage } from '../pages/tabs/tabs';
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
    TodoPage,
    InwestycjePage,
    PracaPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
        tabsPlacement: 'top'
          }),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TodoPage,
    InwestycjePage,
    PracaPage,
    TabsPage
  ],
  providers: []  // AuthData, ProfileData, Data
})
export class AppModule {}
