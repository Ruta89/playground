import { Component } from '@angular/core';
import {
  NavController,
  NavParams,
  ActionSheetController,
  Platform,
  AlertController } from 'ionic-angular';
import { InwestData } from '../../providers/inwest-data';
import { AuthData } from '../../providers/auth-data';
import { Camera } from 'ionic-native';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-inwestycje-detail',
  templateUrl: 'inwestycje-detail.html'
})
export class InwestycjeDetailPage {
  public bill: any;
  // public placeholderPicture: string = "assets/img/debt-collector.jpg";
  public placeholderPicture: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform,
    public actionCtrl: ActionSheetController, public inwestData: InwestData, public authData: AuthData,
    public alertCtrl: AlertController) {

    this.inwestData.getBill(this.navParams.get('billId')).subscribe( billSnap => {
      this.bill = billSnap;
    });

  }

  uploadPicture(billId){
    if(this.authData.fireAuth().isAnonymous == true){
      let alert = this.alertCtrl.create({
        message: "If you want to continue you'll need to provide an email and create a password",
        buttons: [
          { text: "Cancel" },
          {
            text: "OK",
            handler: data => {
              this.navCtrl.push(SignupPage);
            }
          }
        ]
      });
      alert.present();
    } else {
      Camera.getPicture({
        quality : 95,
        destinationType : Camera.DestinationType.DATA_URL,
        sourceType : Camera.PictureSourceType.CAMERA,
        allowEdit : true,
        encodingType: Camera.EncodingType.PNG,
        targetWidth: 19200,
        targetHeight: 12800,
        saveToPhotoAlbum: true
      }).then(imageData => {
        this.inwestData.takeBillPhoto(billId, imageData);
      }, error => {
        console.log("ERROR -> " + JSON.stringify(error));
      });
    }
  }

  showOptions(billId){
    let action = this.actionCtrl.create({
      title: 'Modify your bill',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.inwestData.removeBill(billId).then( () => {
              this.navCtrl.pop();
            });
          }
        },
        {
          text: 'Oznacz jako rozpoczęto budowe!',
          icon: !this.platform.is('ios') ? 'checkmark' : null,
          handler: () => {
            this.inwestData.payBill(billId);
          }
        },
        {
          text: 'Cancel',
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
  ionViewDidLoad() {
    console.log('Hello InwestycjeDetailPage Page');

  }

}
