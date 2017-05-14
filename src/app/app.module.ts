import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

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
import { HomeMapPage } from '../pages/homemap/homemap';
import { TablicaPage } from '../pages/tablica/tablica';
import { Navigation } from '../pages/navigation/navigation';
import { GeolocationPage } from '../pages/geolocation/geolocation';

// Importing provider
import { AuthData } from '../providers/auth-data';
import { ProfileData } from '../providers/profile-data';
import { InwestData } from '../providers/inwest-data';
import { Locations } from '../providers/locations';
import { GoogleMaps } from '../providers/google-maps';
import { Connectivity } from '../providers/connectivity';
import { FeedApi } from '../providers/feed-api';
import { PracaService } from '../providers/praca-service';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Transfer } from '@ionic-native/transfer';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';
import { Facebook } from '@ionic-native/facebook';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Import the AF2 Module
//stare import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

//  directive
import { ElasticHeader } from '../components/elastic-header/elastic-header';
import { PolaczenieComponent } from '../components/polaczenie/polaczenie';

import { LocationTracker } from '../providers/location-tracker';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { MomentModule } from 'angular2-moment';
import { Overslide } from "../components/overslide/overslide";
import { environment } from '../environments/environment';

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
    ElasticHeader,
    HomeMapPage,
    TablicaPage,
    PolaczenieComponent,
    Navigation,
    GeolocationPage,
    Overslide

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsPlacement: 'top'
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule,
    FormsModule,
    MomentModule,
    ReactiveFormsModule,
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
    UploadPage,
    HomeMapPage,
    TablicaPage,
    Navigation,
    GeolocationPage
  ],
  // providers: AuthData, ProfileData, Data
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    File,
    FilePath,
    Transfer,
    Network,
    Geolocation,
    Facebook,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthData,
    ProfileData,
    InwestData,
    Locations,
    GoogleMaps,
    Connectivity,
    FeedApi,
    LocationTracker,
    BackgroundGeolocation,
    PracaService
  ]
})
export class AppModule { }
