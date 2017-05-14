import { Injectable } from '@angular/core';
//import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class FeedApi {
  posts: FirebaseListObservable<any>;
  listaPozycji: FirebaseListObservable<any>;
  naddatki: FirebaseListObservable<any>;
  todos: FirebaseListObservable<any>;
  data: any;

  constructor(public afDb: AngularFireDatabase) {
    console.log('Hello FeedApi Provider');
    this.posts = afDb.list('/posts');
    this.naddatki = afDb.list('/naddatki');
    this.listaPozycji = afDb.list('/produkcjaPoz');
    this.todos = afDb.list('/items');
  }

  get ListaPozycji() {
    return this.listaPozycji;
  }



  // removeNaddatek(naddatekId: string): firebase.Promise<any> {
  //   return this.naddatki.remove(naddatekId);
  // }

  // usunPozycje(produkcjaId: string): firebase.Promise<any> {
  //   return this.listaPozycji.remove(produkcjaId);
  // }
  // //tonaz: number, dlugosc: number, maszyna: string, naddatek: number, timestamp: string
  // addNaddatek(data) {
  //   this.af.database.list('/naddatki').push({
  //     tonaz: data.tonaz,
  //     dlugosc: data.dlugosc,
  //     maszyna: data.maszyna,
  //     naddatek: data.naddatek,
  //     timestamp: Date().toString()
  //   }).then((data) => {
  //     console.log("serwis feed-api, metoda addNaddatek .then((data) => {  " + data);
  //   }).catch((error) => {
  //     console.log("serwis feed-api, metoda addNaddatek .catch((error) => {  " + error);
  //   });
  // }

  // updateNaddatek(data) {                     // badz this.
  //   this.af.database.list('/naddatki').update(data.naddatekId, {
  //     tonaz: data.tonaz,
  //     dlugosc: data.dlugosc,
  //     maszyna: data.maszyna,
  //     naddatek: data.naddatek
  //   });
  // }

  // ########################################################################################################################################
  get Posts() {
    return this.posts;
  }

  addPost(post) {
    this.afDb.list('/posts').push(post);
  }
  // ########################################################################################################################################

  get Todos() {
    return this.todos;
  }

  addTodo(item) {
    this.afDb.list('/items').push({
      "text": item,
      "isDone": false
    });
  }

  usunTodo(item) {
    this.afDb.list('/items').remove(item);
  }

  updateTodo(key, isDone) {
    this.afDb.list('/items').update(key, { isDone: isDone });
  }
  // ########################################################################################################################################


}