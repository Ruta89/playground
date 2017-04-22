import { Component } from '@angular/core';
import { NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
//import { Camera, File, Transfer, FilePath } from 'ionic-native';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';
import { Transfer } from '@ionic-native/transfer';
//import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';

declare var cordova: any;

@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html'
})
export class UploadPage {
  lastImage: string = null;
  loading: Loading;

  constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController, private file: File, private camera: Camera, private filePath: FilePath, private transfer: Transfer) {

  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Wybierz zrodlo zdjecia',
      buttons: [
        {
          text: 'Zaladuj z biblioteki',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Uzyj kamery',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Anuluj',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
            var correctPath = filePath.substr(0, imagePath.lastIndexOf('/') + 1);
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Blad podczas wybierania zdjecia');
    });
  }


  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  // Copy the image a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      this.presentToast('Blad podczas zatrzymywania pliku.');
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  // public uploadImage() {
    
  //   // Destination URL
  //   var url = "http//url/upload.php";

  //   // File for Upload
  //   var targetPath = this.pathForImage(this.lastImage);

  //   // File name only
  //   var filename = this.lastImage;

  //   var options = {
  //     fileKey: "file",
  //     fileName: filename,
  //     chunkedMode: false,
  //     mimeType: "multipart/form-data",
  //     params: { 'fileName': filename }
  //   };

  //   const fileTransfer = new Transfer();

  //   this.loading = this.loadingCtrl.create({
  //     content: 'Zamieszczanie...',
  //   });
  //   this.loading.present();

  //   // Use the fileTransfer to upload the image
  //   fileTransfer.upload(targetPath, url, options).then(data => {
  //     this.loading.dismissAll()
  //     this.presentToast('Zdjecie zaladowane poprawnie.');
  //   }, err => {
  //     this.loading.dismissAll()
  //     this.presentToast('Blad podczas zamieszczania pliku.');
  //   });
  // }

  ionViewDidLoad() {
    console.log('Hello UploadPage Page');
  }

}
