import { Injectable } from '@angular/core';
import {
  AngularFire,
  FirebaseListObservable,
  FirebaseObjectObservable } from 'angularfire2';
  import firebase from 'firebase';

@Injectable()
export class InwestData {
  billList: FirebaseListObservable<any>;
  billDetail: FirebaseObjectObservable<any>;
  userId: string;

  constructor(public af: AngularFire) {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.billList = this.af.database.list('/userProfile/' + auth.uid + '/billList');
        this.userId = auth.uid;
      }
    });

  }

  getBillList(){
    return this.billList;
  }

  getBill(billId: string){
    return this.billDetail = this.af.database.object('/userProfile/' + this.userId + '/billList/' + billId);
  }

  createBill(name: string, amount: number, adres: string, zdjecieMin: string, opis: string, dueDate: string = null, endBuildDate: string = null){
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

  removeBill(billId: string){
    return this.billList.remove(billId);
  }

  payBill(billId: string){
    return this.billList.update(billId, {
      startBuild: true
    });
  }

  takeBillPhoto(billId: string, imageURL: string){
    const storageRef = firebase.storage().ref(this.userId);
    return storageRef.child(billId).child('billPicture')
      .putString(imageURL, 'base64', {contentType: 'image/png'})
        .then( pictureSnapshot => {
          this.billList.update(billId, {
            picture: pictureSnapshot.downloadURL
        });
      });
  }

}