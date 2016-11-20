import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-todo',
  templateUrl: 'todo.html'
})
export class TodoPage {
  items: FirebaseListObservable<any[]>;
  newTodo: string;

  constructor(public navCtrl: NavController, af: AngularFire) {
    this.items = af.database.list('/items');
  }

  addTodo = (item) => {
    if (item) {
      this.items.push(item);
    }
  }

  deleteTodo = (item) => {
    this.items.remove(item);
  }

  //  - Czy to to samo?
  // deleteTodo(item) {
  //   this.items.remove(item);
  // }

  ionViewDidLoad() {
    console.log('Jestes w Todo Page');
  }

}
