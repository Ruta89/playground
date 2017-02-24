import { Injectable } from '@angular/core';

import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import firebase from 'firebase';

@Injectable()
export class AuthData {
  fireAuth: any;
  userProfile: any;
  user: any;

  constructor(public af: AngularFire) {
    af.auth.subscribe(user => {
      if (user) { this.fireAuth = user.auth; }
    });
    this.userProfile = firebase.database().ref('/userProfile');
  }

  getUser() {
    return this.af.auth;
  }


  loginUser(newEmail: string, newPassword: string): any {
    return this.af.auth.login({
      email: newEmail,
      password: newPassword
    });
  }


  anonymousLogin(): any {
    return this.af.auth.login({
      provider: AuthProviders.Anonymous,
      method: AuthMethods.Anonymous
    });
  }

  linkAccount(email: string, password: string): any {
    const userProfile = firebase.database().ref('/userProfile');
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);

    return firebase.auth().currentUser.link(credential).then(user => {
      userProfile.child(user.uid).update({
        email: email
      });
    }, error => {
      console.log("There was an error linking the account", error);
    });
  }

  resetPassword(email: string): any {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  logoutUser(): any {
    return this.af.auth.logout();
  }

  signupUser(email: string, password: string): any {
    return this.af.auth.createUser({ email, password }).then((newUser) => {
      this.userProfile.child(newUser.uid).set({
        email: email
      });
    });
  }

}