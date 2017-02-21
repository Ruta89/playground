import { Component } from '@angular/core';
import { FirebaseObjectObservable, AngularFire } from 'angularfire2';

@Component({
  selector: 'polaczenie',
  templateUrl: 'polaczenie.html'
})
export class PolaczenieComponent {

  status: FirebaseObjectObservable<any>;

  constructor(public af: AngularFire) {
    this.status = this.af.database.object('.info/connected');
  }

}
