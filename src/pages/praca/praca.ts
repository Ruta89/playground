import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
//import { FeedApi } from "../../providers/feed-api";
import { PracaService } from "../../providers/praca-service";

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
  naddatki: any;
  listaPozycji: any = [];
  pozycja: Pozycja = new Pozycja;
  private addForm: FormGroup;
  user: any;
  toggle: boolean = true;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    //public feedApi: FeedApi,
    public pracaService: PracaService,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController) {
    console.log("auth-data this.user" + this.user);
    this.naddatki = pracaService.naddatki;
    //this.naddatki = pracaService.GetNaddatki;
    this.listaPozycji = pracaService.listaPozycji;

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

  otworzPozycje() {
    const modalPozycja = this.modalCtrl.create('DodajPozycjePage');
    modalPozycja.present();

    // modalPozycja.onDidDismiss((data) => {
    //   console.log("modalPozycja.onDidDismiss   I have to dismiss");
    //   console.log(data);
    // });

    // modalPozycja.onWillDismiss((data) => {
    //   console.log(" modalPozycja.onWillDismiss   I'm about to dismiss");
    //   console.log(data);
    // });
  }

  // onFormSubmitted(form) {
  //   console.log('onFormSubmitted(form):');
  //   console.log('form value:', form.value);
  //   // Rest of the logic here
  // }

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
            this.pracaService.zapiszNaddatek(data);
          }
        }
      ]
    });
    prompt.present();
  }

  // removeNaddatek(naddatekId: string) {
  //   //this.naddatki.remove(naddatekId);
  //   // sprubuje przez serwis
  // }

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
            console.log('Kliknales Anuluj uaktualnijPozycje');
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
            console.log('Kliknales Anuluj');
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
            console.log('Kliknales Anuluj');
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
            console.log('Kliknales Anuluj');
          }
        }
      ]
    });
    actionSheet.present();
  }


  ionViewDidLoad() {
    console.log('Hello Praca Page Page');

    let loading = this.loadingCtrl.create({
      content: 'Uzyskiwanie najnowszych wpisów ...'
    });

    loading.present();

    if (this.pracaService.listaPozycji) {
      loading.dismiss();
      console.log('listaPozycji zaladowana');
    } else {
      console.log('listaPozycji nie zostala zaladowana');
    }


  }

}
