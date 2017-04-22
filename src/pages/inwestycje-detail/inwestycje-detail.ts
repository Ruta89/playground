import { Component } from '@angular/core';
import {
  NavController,
  NavParams,
  ActionSheetController,
  Platform,
  AlertController
} from 'ionic-angular';
import { InwestData } from '../../providers/inwest-data';
import { AuthData } from '../../providers/auth-data';
import { Camera } from '@ionic-native/camera';
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
    public alertCtrl: AlertController, private camera: Camera) {

    this.inwestData.getBill(this.navParams.get('billId')).subscribe(billSnap => {
      this.bill = billSnap;
    });

  }


  uploadPicture(billId): void {
    if (this.authData.getUser().isAnonymous == true) {
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
      this.camera.getPicture({
        quality: 95,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: this.camera.EncodingType.PNG,
        targetWidth: 500,
        targetHeight: 500,
        saveToPhotoAlbum: true
      }).then(imageData => {
        this.inwestData.takeBillPhoto(billId, imageData);
      }, error => {
        console.log("ERROR -> " + JSON.stringify(error));
      });
    }
  }

  showOptions(billId) {
    let action = this.actionCtrl.create({
      title: 'Modify your bill',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.inwestData.removeBill(billId).then(() => {
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
