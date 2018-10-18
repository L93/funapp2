import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { PostInterface } from 'src/app/shared/post.model';

@Injectable({providedIn: 'root' }) // <-- ?? what is this
export class DataService {
private postAPIURI = 'http://localhost:49175/api/posts';

  constructor (private http: HttpClient) { } // http lets you define your reqs types: post, get, etc

private posts: PostInterface[];
private postUpdated = new Subject<PostInterface[]>(); // < -- to make little homies aware of new change to variable.
postsCopied;


// data retreival from backend needs to be async.. takes time to transfer from backend.. set to 90ms here:
getPosts () {
  console.log ('getPosts() called');
  this.http.get<{message: string, posts: PostInterface[]}>(this.postAPIURI)
  // no need to unsubscribe, angular does that itself for internal libraries
  .subscribe( (postData) => {
    if (postData) {
      setTimeout( () => {this.posts = postData.posts; console.log('2nd log: ' + JSON.stringify(postData.posts));
        this.postUpdated.next(postData.posts);
        this.postsCopied = JSON.stringify (postData.posts);
        this.posts = postData.posts; }, 90);
        this.postsCopied = JSON.stringify (postData.posts);
      console.log('Data from back end received!: ' +  JSON.stringify(postData.posts)) ; }
    // this.posts = JSON.stringify(postData); // .get method extracts and formats data for us from JSON > JS
     // ... = copy of x, prevents (accidental?) editing of posts.
  });
  console.log('justoutside Timeout: ' + this.posts);

  console.log('postsCopied: ' + this.postsCopied);
}

addPost(nameReceived: string, descriptionReceived: string) {

  const post: PostInterface = {id: null, name: nameReceived, description: descriptionReceived,
  created: JSON.stringify(new Date()), rating: 'Non yet!' };

  this.http.get<{message: string}>(this.postAPIURI).subscribe( (responseData) => {
    console.log ('from DataService: ' + post);
    console.log('from server: ' + responseData.message);
    // following simply pushes info to local obj,
    // cause DB not yet attached, & input isnt pushed 2 list on server.. back end contacted tho.
  this.posts.push(post);
  this.postUpdated.next([...this.posts]);
});
console.log('postUpdated results after post: ' + this.postUpdated);
}

getPostUpdateListener() {
  return this.postUpdated.asObservable();
}


}
