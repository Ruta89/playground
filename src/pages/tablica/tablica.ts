import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FeedApi } from '../../providers/feed-api';

class Post{
  title: string;
  body: string;
  id: string;

  constructor() {}
}

@Component({
  selector: 'page-tablica',
  templateUrl: 'tablica.html'
})
export class TablicaPage {
  posts: any = [];
  post: Post = new Post();

  constructor(public navCtrl: NavController, public feedApi: FeedApi, public alertCtrl: AlertController) {
    this.posts = feedApi.posts;
  }

    submit() {
      this.feedApi.addPost(this.post);
      this.post = new Post();
    }

  addPost(){
    console.log('addPost');

      let alert = this.alertCtrl.create({
          title: 'Login',
          inputs: [
            {
              name: 'title',
              placeholder: 'Tytul'
            },
            {
              name: 'body',
              placeholder: 'Opis'
            }
          ],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Dodaj',
              handler: data => {
                this.posts.push({
                  title: data.title,
                  body: data.body
                });
              }
            }
          ]
        });
        alert.present();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TablicaPage');
  }

}
