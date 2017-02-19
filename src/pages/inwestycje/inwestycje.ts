import { Component } from '@angular/core';
import { NavController, ActionSheetController, Platform } from 'ionic-angular';
import { InwestData } from '../../providers/inwest-data';
import { AuthData } from '../../providers/auth-data';
import { InwestycjeAddPage } from '../inwestycje-add/inwestycje-add';
import { InwestycjeDetailPage } from '../inwestycje-detail/inwestycje-detail';
import { LandingPage } from '../landing/landing';

@Component({
  selector: 'page-inwestycje',
  templateUrl: 'inwestycje.html',
})
export class InwestycjePage {
  public billList: any;
  constructor(public navCtrl: NavController, public inwestData: InwestData,
    public actionCtrl: ActionSheetController, public platform: Platform,
    public authData: AuthData) {
    this.billList = this.inwestData.getBillList();
  }

  createBill(){
    this.navCtrl.push(InwestycjeAddPage);
  }

  goToPaidBill(billId){
    this.navCtrl.push(InwestycjeDetailPage, {
      billId: billId
    });
  }

  moreBillOptions(billId){
    let action = this.actionCtrl.create({
      title: 'Modyfikuj',
      buttons: [
        {
          text: 'Wiecej Informacji',
          icon: !this.platform.is('ios') ? 'play' : null,
          handler: () => {
            this.navCtrl.push(InwestycjeDetailPage, {
              billId: billId
            });
          }
        },
        {
          text: 'Usun',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.inwestData.removeBill(billId);
          }
        },
        {
          text: 'Oznacz jesli zaczeto budowe!',
          icon: !this.platform.is('ios') ? 'checkmark' : null,
          handler: () => {
            this.inwestData.payBill(billId);
          }
        },
        {
          text: 'Anuluj',
          role: 'cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    action.present();
  }

  logMeOut() {
    this.authData.logoutUser().then( () => {
      this.navCtrl.push(LandingPage);
    });
  }
}
