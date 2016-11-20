import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { PracaPage } from '../praca/praca';
import { InwestycjePage } from '../inwestycje/inwestycje';
import { StartPage } from '../start/start';

@Component({
  selector: 'page-my-tab-page',
  templateUrl: 'my-tab-page.html'
})
export class MyTabPage {

  tab1Root: any = HomePage;
  tab2Root: any = PracaPage;
  tab3Root: any = InwestycjePage;
  tab4Root: any = StartPage;

  constructor(public navCtrl: NavController) {

  }

}
