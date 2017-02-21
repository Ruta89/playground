import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { ResetPasswordPage } from '../reset-password/reset-password';

import { AuthData } from '../../providers/auth-data';

import { EmailValidator } from '../../validators/email';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loginForm: any;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;

  constructor(public navCtrl: NavController,
    public authData: AuthData,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required,
      EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6),
      Validators.required])]
    });

  } // constructor

  elementChanged(input) {
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }


  loginUser() {
    if (!this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email,
        this.loginForm.value.password).then(() => {
          this.loading.dismiss().then(() => {
            this.navCtrl.setRoot(TabsPage);
          });
        }, error => {
          this.loading.dismiss().then(() => {
            let alert = this.alertCtrl.create({
              message: error.message,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
            alert.present();
          });
        });

      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }
  goToResetPassword() {
    this.navCtrl.push(ResetPasswordPage);
  }

  createAccount() {
    this.navCtrl.push(SignupPage);
  }

  ionViewDidLoad() {
    console.log('Hello LoginPage Page');
  }

}
