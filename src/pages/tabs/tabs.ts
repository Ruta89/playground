import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


import { HomePage } from '../home/home'
import { TodoPage } from '../todo/todo'
import { InwestycjePage } from '../inwestycje/inwestycje'
import { PracaPage } from '../praca/praca'

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: any = HomePage;
  tab2Root: any = TodoPage;
  tab3Root: any = InwestycjePage;
  tab4Root: any = PracaPage;

  constructor(public navCtrl: NavController) {

  }

}
