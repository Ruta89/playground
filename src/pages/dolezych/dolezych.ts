import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { LocalNotifications } from '@ionic-native/local-notifications';
export interface Customer {
  name: string; // required field with minimum 5 characters
  addresses: Address[]; // user can have one or more addresses
}

export interface Address {
  street: string;  // required field
  postalcode: string;
}

@IonicPage()
@Component({
  selector: 'page-dolezych',
  templateUrl: 'dolezych.html',
})
export class DolezychPage {
  myForm: FormGroup;
  cards: any;
    category: string = 'gear';

  constructor(public alertCtr: AlertController, private localNotifications: LocalNotifications, private fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, public plt: Platform) {
    this.cards = new Array(10);
   
    this.plt.ready().then((rdy) => {
      this.localNotifications.on('click', (notification, state) => {
        let json = JSON.parse(notification.data);

        let alert = this.alertCtr.create({
          title: notification.title,
          subTitle: json.myData
        });
        alert.present();
      });
    });
  }

  powiadomienie() {
    this.localNotifications.schedule({
      id: 1,
      title: 'Powiadomienie',
      text: 'Powiadomienie z apki',
      at: new Date(new Date().getTime() + 5 * 1000),
      data: { myData: 'ukryta wiadomosc' }
    });
  }


  ngOnInit() {
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      addresses: this.fb.array([
        this.initAddress(),
      ])
    });
  }

  initAddress() {
    return this.fb.group({
      street: ['', Validators.required],
      postcode: ['']
    });
  }

  addAddress() {
    const control = <FormArray>this.myForm.controls['addresses'];
    control.push(this.initAddress());
  }

  removeAddress(i: number) {
    const control = <FormArray>this.myForm.controls['addresses'];
    control.removeAt(i);
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Steet is Required',
      duration: 3000,
      showCloseButton: true,
      position: 'top'
    });
    toast.onDidDismiss(() => {
      console.log('Toast Dismissed');
    });
  }

  save(model: Customer) {
    console.log(model);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DolezychPage');
  }

}
