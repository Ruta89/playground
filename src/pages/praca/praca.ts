import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController, NavParams, Modal, ModalOptions, ModalController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'page-praca',
  templateUrl: 'praca.html'
})
export class PracaPage {
  naddatki: FirebaseListObservable<any>;
  objectnaddatki: FirebaseObjectObservable<any[]>;

  private addForm: FormGroup;


  constructor(public navCtrl: NavController, af: AngularFire, private alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController,
    private formBuilder: FormBuilder, public navParams: NavParams, private modal: ModalController) {

    this.naddatki = af.database.list('/naddatki');

    this.addForm = this.formBuilder.group({
      wll: [''],
      l1: [''],
      licznik: [''],
      nici: [''],
      auf: [''],
      ilosc: [''],
      waga: [''],
    });


  }


  openModal() {

    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false    //jezeli klikne za oknem to sie nie zamknie
    };

    const myData = {
      name: 'Arek Ruta',
      occupation: 'Developer'
    };

    const myModal: Modal = this.modal.create('ModalPage', { data: myData }, myModalOptions);

    myModal.present();

    myModal.onDidDismiss((data) => {
      console.log("I have to dismiss");
      console.log(data);
    });

    myModal.onWillDismiss((data) => {
      console.log("I'm about to dismiss");
      console.log(data);
    });
  }

  onFormSubmitted(form) {
    console.log('onFormSubmitted(form):');
    console.log('form value:', form.value);
    // Rest of the logic here
  }

  addNaddatek() {
    let prompt = this.alertCtrl.create({
      title: 'Wpisz naddatek',
      inputs: [
        {
          name: 'tonaz',
          type: 'number',
          placeholder: 'Tonaz'
        },
        {
          name: 'dlugosc',
          type: 'number',
          placeholder: 'Dlugość'
        },
        {
          name: 'maszyna',
          type: 'text',
          placeholder: 'maszyna'
        },
        {
          name: 'naddatek',
          type: 'number',
          placeholder: 'Naddatek'
        }
      ],
      buttons: [
        {
          text: 'Anuluj',
          handler: data => {
            console.log('Anulowales dodanie naddatku');
          }
        },
        {
          text: 'Zapisz',
          handler: data => {
            this.naddatki.push({
              tonaz: data.tonaz,
              dlugosc: data.dlugosc,
              maszyna: data.maszyna,
              naddatek: data.naddatek,
              timestamp: Date().toString()
            }).then((data) => {
              console.log(data);
            }).catch((error) => {
              console.log(error);
            });
          }
        }
      ]
    });
    prompt.present();
  }

  removeNaddatek(naddatekId: string) {
    this.naddatki.remove(naddatekId);
  }


  updateNaddatek(naddatekId, naddatekTonaz, naddatekDlugosc, naddatekMaszyna, naddatekNaddatek) {
    let prompt = this.alertCtrl.create({
      title: 'Aktualizacja danych',
      message: 'Wprowadz poprawki ',
      inputs: [
        {
          name: 'tonaz',
          placeholder: "Tonaz",
          value: naddatekTonaz
        },
        {
          name: 'dlugosc',
          placeholder: "Dlugosc",
          value: naddatekDlugosc
        },
        {
          name: 'maszyna',
          placeholder: "Maszyna",
          value: naddatekMaszyna
        },
        {
          name: 'naddatek',
          placeholder: "Naddatek",
          value: naddatekNaddatek
        }
      ],
      buttons: [
        {
          text: 'Anuluj',
          handler: data => {
            console.log('Kliknales Anuluj');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.naddatki.update(naddatekId, {
              tonaz: data.tonaz,
              dlugosc: data.dlugosc,
              maszyna: data.maszyna,
              naddatek: data.naddatek
            });
          }
        }
      ]
    });
    prompt.present();
  }



  showOptions(naddatekId, naddatekTonaz, naddatekDlugosc, naddatekMaszyna, naddatekNaddatek) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Co chcesz zrobić?',
      buttons: [
        {
          text: 'Usuń naddatek',
          role: 'destructive',
          handler: () => {
            this.removeNaddatek(naddatekId);
          }
        }, {
          text: 'Uaktualnij naddatek',
          handler: () => {
            this.updateNaddatek(naddatekId, naddatekTonaz, naddatekDlugosc, naddatekMaszyna, naddatekNaddatek);
          }
        }, {
          text: 'Anuluj',
          role: 'cancel',
          handler: () => {
            console.log('Kliknales Anuluj');
          }
        }
      ]
    });
    actionSheet.present();
  }

  ionViewDidLoad() {
    console.log('Hello Praca Page Page');
  }

}
