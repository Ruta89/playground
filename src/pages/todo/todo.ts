import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
    selector: 'page-todo',
    templateUrl: 'todo.html'
})
export class TodoPage {
    items: FirebaseListObservable<any[]>;
    newTodo: string;
    ladowanie: any;

    constructor(public navCtrl: NavController, public af: AngularFire, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
        this.pokazladowanie();
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

    }

    public showMessage(message: string, cssClass: string) {
        let toast = this.toastCtrl.create({
            message: message,
            cssClass: cssClass,
            duration: 3000
        });
        toast.present();
    }

    getItems(): any {
        console.log('getItems() ');
        this.items = this.af.database.list('/items');
    }
    pokazladowanie() {

        let loading = this.loadingCtrl.create({
            content: 'Proszę czekać...'
        });

        loading.present();

        setTimeout(() => {
            loading.dismiss();
        }, 1000);

    }

    ionViewDidLoad() {
        console.log('Jestes w Todo Page ionViewDidLoad');
        this.getItems();
    }

}
