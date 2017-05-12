import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable } from "angularfire2";
import firebase from 'firebase';


@Injectable()
export class PracaService {
        naddatki: FirebaseListObservable<any[]>;
currentUser:any

    wll: any;
    l1: any;
    m: any;
    nici: any;
    auf: any;
    ilosc: any;
    listaPozycji: any;
    data: any;
    constructor(public http: Http, public af: AngularFire) {
         this.currentUser = firebase.auth().currentUser.uid;
        this.listaPozycji = af.database.list(`userProfile/${this.currentUser}/listaPozycji`);
        this.naddatki = af.database.list(`userProfile/${this.currentUser}/naddatki`);
       // this.listaPozycji = af.database.list('/produkcjaPoz');
       // this.naddatki = af.database.list('/naddatki');


    }
    get GetListaPozycji() {
        return this.listaPozycji;
    }

    get GetNaddatki() {
        return this.naddatki;
    }

    savePozycja(wll, l1, m, nici, auf, ilosc) {
        this.listaPozycji.push({
            wll: wll,
            l1: l1,
            m: m,
            nici: nici,
            auf: auf,
            ilosc: ilosc,
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
            date:  new Date().toISOString()
        }).then(nowaPozycja => {
            //console.log('Zapisana pozycja' + wll, l1, m, nici, auf, ilosc);
            console.log("modal dodaj pozycje: nowaPozycja  " + nowaPozycja);
            //this.navCtrl.push('PracaPage');
        }, error => {
            console.log("zapiszPozycje()  " + error);
        });


    }

    //tonaz: number, dlugosc: number, maszyna: string, naddatek: number, timestamp: string
    zapiszNaddatek(data) {
        this.naddatki.push({
            tonaz: data.tonaz,
            dlugosc: data.dlugosc,
            maszyna: data.maszyna,
            naddatek: data.naddatek,
            timestamp: new Date().toISOString()
        }).then((data) => {
            console.log("praca service.then((data) => {  " + data);
        }).catch((error) => {
            console.log("praca service, metoda addNaddatek .catch((error) => {  " + error);
        });
    }

    updateNaddatek(data) {                     // badz this.
        this.naddatki.update(data.naddatekId, {
            tonaz: data.tonaz,
            dlugosc: data.dlugosc,
            maszyna: data.maszyna,
            naddatek: data.naddatek
        });
    }

    removeNaddatek(naddatekId: string): firebase.Promise<any> {
        return this.naddatki.remove(naddatekId);
    }

    usunPozycje(produkcjaId: string): firebase.Promise<any> {
        return this.listaPozycji.remove(produkcjaId);
    }


}