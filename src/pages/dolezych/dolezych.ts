import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

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

  constructor(private fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController) {
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

  presentToast(){
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
