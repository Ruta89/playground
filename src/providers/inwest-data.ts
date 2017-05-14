import { Injectable } from '@angular/core';
//import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import firebase from 'firebase';
import { AngularFireAuth } from "angularfire2/auth";

@Injectable()
export class InwestData {
  billList: FirebaseListObservable<any>;
  billDetail: FirebaseObjectObservable<any>;
  userId: string;

  constructor(public afAuth: AngularFireAuth, public afDB: AngularFireDatabase) {
    this.userId = afAuth.auth.currentUser.uid;
    this.billList = afDB.list(`/userProfile/${this.userId}/billList`);
  }


  getBillList(): FirebaseListObservable<any> {
    return this.billList;
  }

  getBill(billId: string): FirebaseObjectObservable<any> {
    return this.billDetail = this.afDB.object('/userProfile/' + this.userId + '/billList/' + billId);
  }

  createBill(name: string, amount: number, adres: string, zdjecieMin: string, opis: string, dueDate: string = null, endBuildDate: string = null): firebase.Promise<any> {
    return this.billList.push({
      name: name,
      amount: amount,
      adres: adres,
      zdjecieMin: zdjecieMin,
      opis: opis,
      dueDate: dueDate,
      endBuildDate: endBuildDate,
      startBuild: false
    });
  }

  removeBill(billId: string): firebase.Promise<any> {
    return this.billList.remove(billId);
  }

  payBill(billId: string): firebase.Promise<any> {
    return this.billList.update(billId, {
      startBuild: true
    });
  }

  takeBillPhoto(billId: string, imageURL: string): any {
    const storageRef = firebase.storage().ref(this.userId);
    return storageRef.child(billId).child('billPicture')
      .putString(imageURL, 'base64', { contentType: 'image/png' })
      .then(pictureSnapshot => {
        this.billList.update(billId, {
          picture: pictureSnapshot.downloadURL
        });
      });
  }

}
