import { Component } from '@angular/core';
import { HomePage } from '../home/home'
import { TodoPage } from '../todo/todo'
import { InwestycjePage } from '../inwestycje/inwestycje'
import { PracaPage } from '../praca/praca'
import { ProfilePage } from '../profile/profile';
//import { NavController } from 'ionic-angular';
//import { AuthData } from '../../providers/auth-data';
//import { ProfileData } from '../../providers/profile-data';
//import { AngularFire } from 'angularfire2';
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: any = HomePage;
  tab2Root: any = TodoPage;
  tab3Root: any = InwestycjePage;
  tab4Root: any = PracaPage;
  tab5Root: any = ProfilePage;

  constructor() { }



}
