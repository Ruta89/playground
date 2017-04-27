import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  destination2:any;
  data:any;

  constructor(private navParams: NavParams, private view: ViewController) {

    // // jak dzialaja promise
    // let promise = new Promise((resolve, reject) => {
    //   let value = false;

    //   setTimeout(() => {

    //   if (value) {
    //     resolve("this value is true");
    //   } else {
    //     reject("this value is false");
    //   }
    //   }, 3000);
    // })

    // promise.then(resolved => console.log(resolved), error => console.log(error));

    // // po 3 sekundach zwraca resolve albo reject w zaleznosci czy value ma wartosc


  }

  wartosc = false;
   wartosc2 = true;


  closeModal() {
    const data = {
      name: 'Przemek MotoGP',
      occupation: 'Gracz'
    };

    this.view.dismiss(data);
  }

  ionViewWillLoad() {
    console.log('ionViewWillLoad');
    const data = this.navParams.get('data');
    console.log(data);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

}
