import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-todo',
  templateUrl: 'todo.html'
})
export class TodoPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Jestes w Todo Page');
  }

}
