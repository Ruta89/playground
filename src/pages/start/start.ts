import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@Component({
    selector: 'page-start',
    templateUrl: 'start.html'
})
export class StartPage {
    icons: any;
    relationship: any;
    constructor(public navCtrl: NavController, public toastCtrl: ToastController) {
    }

    showToast(position: string) {
        let toast = this.toastCtrl.create({
            message: 'Wow ale zajebiście!!!',
            duration: 3000,
            position: position,
            showCloseButton: true,
            closeButtonText: 'Zamknij'
        });

        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });

        toast.present(toast);
    }




    ionViewLoaded() {
    }

    ionViewDidLoad() {
        console.log('Hello StartPage Page');
    }


}
