import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class FeedApi {
  posts: FirebaseListObservable<any>;

  constructor(public af: AngularFire) {
    console.log('Hello FeedApi Provider');
    this.posts = af.database.list('/posts');
  }

  get Posts() {
    return this.posts;
  }

  addPost(post) {
    this.af.database.list('/posts').push(post);
  }

}
