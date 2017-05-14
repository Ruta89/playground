import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import  firebase from 'firebase';
@Injectable()
export class ProfileData {

  userProfile: any;
  currentUser: any;

  constructor(public afAuth: AngularFireAuth, public afDb: AngularFireDatabase, public af: AngularFireDatabase) {

    afAuth.authState.subscribe((user) => {
      if (user){ 
         this.currentUser = user;
         console.log("Uzytkownik "+ user.email +" zalogowant."+ user.uid +" uid");
      } else {
        console.log("nie ma uzytownika w profile-data");
      }
    }); 


    this.userProfile = firebase.database().ref('/userProfile');
   this.currentUser = afAuth.auth.currentUser;
   // this.currentUser = firebase.auth().currentUser;
    //this.currentUser = afAuth.auth.currentUser;
    //this.userProfile = this.afDb.database.ref('/userProfile');
  }

  getUserProfile(): any {
    return this.userProfile.child(this.currentUser.uid);
  }

  updateName(firstName: string, lastName: string): any {
    return this.userProfile.child(this.currentUser.uid).update({
      firstName: firstName,
      lastName: lastName,
    });
  }

  updateDOB(birthDate: string): any {
    return this.userProfile.child(this.currentUser.uid).update({
      birthDate: birthDate,
    });
  }

  updateEmail(newEmail: string): any {
    this.currentUser.updateEmail(newEmail).then(() => {
      this.userProfile.child(this.currentUser.uid).update({
        email: newEmail
      });
    }, (error) => {
      console.log(error);
    });
  }

  updatePassword(newPassword: string): any {
    this.currentUser.updatePassword(newPassword).then(() => {
      console.log("Password Changed");
    }, (error) => {
      console.log(error);
    });
  }



}