import { NgModule, ErrorHandler} from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { TodoPage } from '../pages/todo/todo';
import { InwestycjePage } from '../pages/inwestycje/inwestycje';
import { PracaPage } from '../pages/praca/praca';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { SignupPage } from '../pages/signup/signup';
import { ProfilePage } from '../pages/profile/profile';

import { LandingPage } from '../pages/landing/landing';
import { InwestycjeDetailPage } from '../pages/inwestycje-detail/inwestycje-detail';
import { InwestycjeAddPage } from '../pages/inwestycje-add/inwestycje-add';
import { MapPage } from '../pages/map/map';
import { ListPage } from '../pages/list/list';
import { UploadPage } from '../pages/upload/upload';

// Importing provider
import { AuthData } from '../providers/auth-data';
import { ProfileData } from '../providers/profile-data';
import { InwestData } from '../providers/inwest-data';
import { Locations } from '../providers/locations';
import { GoogleMaps } from '../providers/google-maps';
import { Connectivity } from '../providers/connectivity';
// Import the AF2 Module
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

//  directive
import { ElasticHeader } from '../components/elastic-header/elastic-header';

//gy
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
    TabsPage,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    ProfilePage,
    LandingPage,
    InwestycjeDetailPage,
    InwestycjeAddPage,
    MapPage,
    ListPage,
    UploadPage,
    ElasticHeader

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
    TabsPage,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    ProfilePage,
    LandingPage,
    InwestycjeDetailPage,
    InwestycjeAddPage,
    MapPage,
    ListPage,
    UploadPage
  ],
  // providers: AuthData, ProfileData, Data
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthData, 
    ProfileData,
    InwestData,
    Location,
    GoogleMaps,
    Connectivity
    ]
})
export class AppModule {}
