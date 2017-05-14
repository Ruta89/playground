import { Component } from '@angular/core';
//import { FirebaseObjectObservable, AngularFire } from 'angularfire2';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'polaczenie',
  templateUrl: 'polaczenie.html'
})
export class PolaczenieComponent {

  status: FirebaseObjectObservable<any>;

  constructor(public afDb: AngularFireDatabase) {
    this.status = this.afDb.object('.info/connected');
  }

}
