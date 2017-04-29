import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { PracaPage } from "../praca";

@IonicPage()
@Component({
  selector: 'page-dodajPozycje',
  templateUrl: 'dodajPozycje.html',
})
export class DodajPozycjePage {
  formGroupDodajPozycje: FormGroup;
  data: any;
  listaPozycji: FirebaseListObservable<any>;
  wll: any;
  l1: any;
  m: any;
  nici: any;
  auf: any;
  ilosc: any;

  constructor(private fb: FormBuilder, public navCtrl: NavController, private navParams: NavParams, private view: ViewController, public af: AngularFire) {

    this.listaPozycji = af.database.list('/produkcjaPoz');
    this.createForm();
  }

  createForm() {
    this.formGroupDodajPozycje = this.fb.group({
      wll: ['', Validators.required],
      l1: ['', Validators.required],
      m: ['', Validators.required],
      nici: ['', Validators.required],
      auf: [''],
      ilosc: ['', Validators.required],
      date: new Date().toISOString()
    });
  }


  zapiszPozycje(wll, l1, m, nici, auf, ilosc) {
    this.listaPozycji.push({
      wll: wll,
      l1: l1,
      m: m,
      nici: nici,
      auf: auf,
      ilosc: ilosc,
      date: new Date().toISOString()

    }).then(nowaPozycja => {
      console.log('Zapisana pozycja' + wll, l1, m, nici, auf, ilosc);
      console.log("modal dodaj pozycje: nowaPozycja  " +nowaPozycja);
      this.navCtrl.push(PracaPage);
    }, error => {
      console.log("zapiszPozycje()  " + error);
    });
  }

  closeModal() {
    this.view.dismiss();
  }

  ionViewWillLoad() {
    console.log('ionViewWillLoad DodajPozycje.ts');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DodajPozycje.ts');
  }

}