import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PracaService } from "../../providers/praca-service";
import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { AuthData } from "../../providers/auth-data";
class Pozycja {
  wll: number;
  l1: number;
  licznik: number;
  nici: string;
  auf: number;
  ilosc: number;
  currentPerson: any;
  constructor() { }
}

@Component({
  selector: 'page-praca',
  templateUrl: 'praca.html'
})
export class PracaPage {
  formGroupDodajPozycje: FormGroup;
  data: any;
  listaPozycji: FirebaseListObservable<any[]>;
  pozycje: FirebaseListObservable<any>;
  wll: any;
  l1: number;
  m: any;
  nici: any;
  auf: any;
  ilosc: any;
  naddatki: FirebaseListObservable<any[]>;
  pozycja: Pozycja = new Pozycja;
  user: any;
  toggle: boolean = true;
  segmentPraca: string = "pozycje";
  pozycjaDetail: any;
  currentUser: any;
  id: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public pracaService: PracaService,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    public afDB: AngularFireDatabase, public authData: AuthData) {
    this.naddatki = pracaService.naddatki;
    this.pozycje = pracaService.pozycje;
    this.currentUser = firebase.auth().currentUser.uid;
    this.createForm();
  }

  getPozycja(id: string): FirebaseObjectObservable<any> {
    return this.pozycjaDetail = this.afDB.object('/userProfile/' + this.currentUser + '/listaPozycji/' + id);
  }

  createForm() {
    this.formGroupDodajPozycje = this.formBuilder.group({
      wll: ['', Validators.required],
      l1: ['', Validators.required],
      m: ['', Validators.required],
      nici: ['', Validators.required],
      auf: [''],
      ilosc: ['', Validators.required]
    });
  }

  openDetail(id) {
    this.navCtrl.push('PracaDetailPage', {
      id: id
    });
  }

  zapiszPozycje(wll, l1, m, nici, auf, ilosc) {
    this.pracaService.savePozycja(wll, l1, m, nici, auf, ilosc);
    this.navCtrl.push(PracaPage);
  }

  otworzPozycje() {
    const modalPozycja = this.modalCtrl.create('DodajPozycjePage');
    modalPozycja.present();
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
           // console.log('Anulowales dodanie naddatku');
          }
        },
        {
          text: 'Zapisz',
          handler: data => {
            this.pracaService.zapiszNaddatek(data);
          }
        }
      ]
    });
    prompt.present();
  }

  usunPozycje(produkcjaId: string) {
    this.listaPozycji.remove(produkcjaId);
  }


  uaktualnijPozycje(produkcjaId, wll, l1, m, nici, auf, ilosc) {
    let alert = this.alertCtrl.create({
      title: 'Aktualizacja pozycji' + produkcjaId,
      message: 'Możesz wprowadzić poprawki',
      inputs: [
        {
          name: 'wll',
          placeholder: 'Tonaz',
          value: wll
        },

      ],
      buttons: [
        {
          text: 'Anuluj',
          handler: data => {
           // console.log('Kliknales Anuluj uaktualnijPozycje');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.listaPozycji.update(produkcjaId, {
              wll: data.wll,
              l1: data.l1,
              m: data.m,
              nici: data.nici,
              auf: data.auf,
              ilosc: data.ilosc
            });
          }
        }
      ]
    });
    alert.present();
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
            //console.log('Kliknales Anuluj');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.pracaService.updateNaddatek(data);
          }
        }
      ]
    });
    prompt.present();
  }


  showOptionslistaPozycji(produkcjaId, wll, l1, m, nici, auf, ilosc) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Co chcesz zrobić?' + produkcjaId,
      buttons: [
        {
          text: 'Usuń pozycje',
          role: 'destructive',
          handler: () => {
            this.usunPozycje(produkcjaId);
          }
        },
        {
          text: 'Uaktualnij pozycje',
          handler: () => {
            this.uaktualnijPozycje(produkcjaId, wll, l1, m, nici, auf, ilosc);
          }
        },
        {
          text: 'Anuluj',
          role: 'cancel',
          handler: () => {
          //  console.log('Kliknales Anuluj');
          }
        }
      ]
    });
    actionSheet.present();
  }



  showOptions(naddatekId, naddatekTonaz, naddatekDlugosc, naddatekMaszyna, naddatekNaddatek) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Co chcesz zrobić?',
      buttons: [
        {
          text: 'Usuń naddatek',
          role: 'destructive',
          handler: () => {
            this.pracaService.removeNaddatek(naddatekId);
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
           // console.log('Kliknales Anuluj');
          }
        }
      ]
    });
    actionSheet.present();
  }


  ionViewDidLoad() {
   // console.log('Hello Praca Page Page');

    let loading = this.loadingCtrl.create({
      content: 'Uzyskiwanie najnowszych wpisów ...'
    });

    loading.present();

    if (this.pracaService.pozycje) {
      loading.dismiss();
     // console.log('listaPozycji zaladowana');
    } else {
     // console.log('listaPozycji nie zostala zaladowana');
    }


  }

}
