import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-todo',
  templateUrl: 'todo.html'
})
export class TodoPage {
    items: FirebaseListObservable<any[]>;
    newTodo: string;

    constructor(public navCtrl: NavController, af: AngularFire, public toastCtrl: ToastController) {
        this.items = af.database.list('/items');
    }

    addTodo = (item) => {
        if (item) {
            this.items.push({
                "text": item,
                "isDone": false
            });
            this.showMessage('Zadanie zostalo przyjęte :) ', 'toast-success');
        }
    }

    deleteTodo = (item) => {
        if (item.isDone) {
            this.items.remove(item);
            this.showMessage('Zadanie zostalo usunięte', 'toast-delete');
        }
    }

    //  - Czy to to samo?
    // deleteTodo(item) {
    //   this.items.remove(item);
    // }

    updateTodo = (key, isDone) => {
        this.items.update(key, { isDone: isDone });
          this.showMessage('Zadanie zostalo updateTodo', 'toast-delete');

    }

    public showMessage(message: string, cssClass: string ){
       let toast = this.toastCtrl.create({
        message: message,
        cssClass: cssClass,
        duration: 3000
      });
      toast.present();
    }


    ionViewDidLoad() {
        console.log('Jestes w Todo Page');
    }

}
