import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { FeedApi } from "../../providers/feed-api";

@Component({
    selector: 'page-todo',
    templateUrl: 'todo.html'
})
export class TodoPage {
    items: any;
    newTodo: string;

    constructor(public navCtrl: NavController,
        public feedApi: FeedApi,
        public toastCtrl: ToastController,
        public loadingCtrl: LoadingController) {
        this.items = feedApi.todos;
    }

    addTodo = (item) => {
        if (item) {
            this.feedApi.addTodo(item);
            this.showMessage('Zadanie zostalo przyjęte :) ', 'toast-success');
        }
    }

    deleteTodo = (item) => {
        if (item.isDone) {
            this.feedApi.usunTodo(item);
            this.showMessage('Zadanie zostalo usunięte', 'toast-delete');
        }
    }

    updateTodo = (key, isDone) => {
        this.feedApi.updateTodo(key, { isDone: isDone })
    }

    public showMessage(message: string, cssClass: string) {
        let toast = this.toastCtrl.create({
            message: message,
            cssClass: cssClass,
            duration: 3000
        });
        toast.present();
    }

    ionViewDidLoad() {
        console.log('Jestes w Todo Page ionViewDidLoad');

        let loading = this.loadingCtrl.create({
            content: 'Proszę czekać...'
        });

        loading.present();

        if (this.feedApi.todos) {
            loading.dismiss();
            console.log('todo zaladowana');
        } else {
            console.log('listaPozycji nie zostala zaladowana');
        }
    }

}
