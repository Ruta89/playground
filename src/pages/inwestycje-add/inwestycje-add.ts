import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { InwestData } from '../../providers/inwest-data';

@Component({
  selector: 'page-inwestycje-add',
  templateUrl: 'inwestycje-add.html',
})
export class InwestycjeAddPage {
  public newBillForm;
  nameChanged: boolean = false;
  amountChanged: boolean = false;
  adresChanged: boolean = false;
  zdjecieMinChanged: boolean = false;
  opisChanged: boolean = false;
  dueDateChanged: boolean = false;
  endBuildChanged: boolean = false;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public inwestData: InwestData, public formBuilder: FormBuilder) {
    this.newBillForm = formBuilder.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
      adres: ['', Validators.required],
      zdjecieMin: ['', Validators.required],
      opis: ['', Validators.required],
      dueDate: ['', Validators.required],
      endBuildDate: ['', Validators.required],
    });
  }

  elementChanged(input) {
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  createBill() {
    this.submitAttempt = true;

    if (!this.newBillForm.valid) {
      console.log(this.newBillForm.value);
    } else {
      this.inwestData.createBill(this.newBillForm.value.name, this.newBillForm.value.amount, this.newBillForm.value.adres, this.newBillForm.value.zdjecieMin,
        this.newBillForm.value.opis, this.newBillForm.value.dueDate, this.newBillForm.value.endBuildDate).then(() => {
          this.navCtrl.pop();
        }, error => {
          console.log(error);
        });

    }
  }

}
