import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Platform } from 'ionic-angular';

@Injectable()
export class Connectivity {

  onDevice: boolean;

  constructor(public platform: Platform, private network: Network) {
    console.log('Hello Connectivity Provider');
    this.onDevice = this.platform.is('cordova');
  }

  isOnline(): boolean {
    if (this.onDevice && this.network.type) {
      return this.network.type !== "none";
    } else {
      return navigator.onLine;
    }
  }

  isOffline(): boolean {
    if (this.onDevice && this.network.type) {
      return this.network.type === "none";
    } else {
      return !navigator.onLine;
    }
  }

}
