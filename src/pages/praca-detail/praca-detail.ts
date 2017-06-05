import { PracaPage } from './../praca/praca';
import { AuthData } from './../../providers/auth-data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PracaService } from "../../providers/praca-service";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";

@IonicPage()
@Component({
    selector: 'page-praca-detail',
    templateUrl: 'praca-detail.html',
})
export class PracaDetailPage {
    idID: any;
    pozycja: any;
    poz: any;
    currentUser: any;
    user: any;
    listaPozycji: any;
    pp: any;
    bb: any;
    userProf: any;
    lp: any;
    item: any;
    data: any;
    dataF: any;
    data2: any;
    l1: number;
    wll: any;
    keyS: any;
    pozObj: any;
    pozObjF: any;
    pozLin: any;
    min: number;
    max: number;
    proc: number;
    mTocm: number;
    maxToM: number;
    dlugoscM: number;
    dlugoscCm: number;
    wynik: number;
    licz: number;
    czas: any;
    auf1: any;
    auf2: any;
    auf3: any;
    aufFormat: any;
    constructor(public authService: AuthData, public afAuth: AngularFireAuth, public afDb: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public pracaService: PracaService) {
        this.idID = this.navParams.get('id');
        afAuth.authState.subscribe((user) => {
            if (user) {
                this.currentUser = user.uid;
                this.userProf = afDb.list('/userProfile/' + this.currentUser);
                this.lp = this.afDb.list('/listaPozycji/');
            } else {
                console.log("uzytkownik nie zalogowany brak uid");
            }
            this.pozLin = afDb.list('/userProfile/' + this.currentUser + '/listaPozycji/')
            this.item = afDb.object('/userProfile/' + this.currentUser + '/listaPozycji/' + this.idID, { preserveSnapshot: true });
            this.item.subscribe(snapshot => {
                this.data = snapshot.val();
                this.keyS = snapshot.key;
            });
        });
        this.listaPozycji = pracaService.getPozycje();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PracaDetailPage');

        // ustawianie tolerancji
        this.proc = (0.01 * this.data.l1); // 0.02
        this.min = this.data.l1 - this.proc;
        this.max = (this.data.l1 * 1) + (this.proc * 1);
        console.log("min --  " + this.min + "max --  " + this.max);


        // ustawianie licznika -------------------------------------------------------
        // od 1t do 4
        if (this.data.wll >= 1 && this.data.wll <= 4) {
            this.licz = (this.data.l1 * 1) * 22;
        } else {
            console.log("l1 to nie 1, 2, 3, 4");
        }
        // od 5t  do 8
        if (this.data.wll >= 5 && this.data.wll <= 8) {
            this.licz = (this.data.l1 * 1) * 20;
        } else {
            console.log("l1 to nie 5 - 8");
        }


        // Format zlecenia -------------------------------------------------------------------
        if (this.data.auf.length > 8) {
            // format auf
            this.auf1 = this.data.auf.substr(0, 6); // 777888
            this.auf2 = this.data.auf.substr(6, 2);// 01
            this.auf3 = this.data.auf.substr(8, 2); //10
            this.aufFormat = this.auf1 + " / " + this.auf2 + " / " + this.auf3;
        } else {
            this.aufFormat = this.data.auf;
            console.log("auf ma mniej niz 8 znakow");
        }

    }

    usunPoz(id) {
        this.pozLin.remove(id).then(() => {
            this.navCtrl.push(PracaPage);
        });
    }

}
