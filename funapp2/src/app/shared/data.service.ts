import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import  { HttpClientModule } from "@angular/common/http";
import { HttpClient } from '@angular/common/http';
import { PostInterface } from 'src/app/shared/post.model';

@Injectable({providedIn: "root" }) // <-- ?? what is this 
export class DataService {

  constructor (private http: HttpClient) { } // http lets you define your reqs types: post, get, etc

private posts: PostInterface[];
private postUpdated = new Subject<PostInterface[]>(); // < -- to make little homies aware of new change to variable.
postsCopied;


// data retreival from backend needs to be async.. takes time to transfer from backend.. set to 90ms here:
getPosts (){ 
  console.log ('getPosts() called')
  this.http.get<{message: string, posts: PostInterface[]}>('http://localhost:49157/api/posts')
  //no need to unsubscribe, angular does that itself for internal libraries
  .subscribe( (postData) => {
    if (postData) { 
      setTimeout( () => {this.posts = postData.posts; console.log('2nd log: ' + JSON.stringify(postData.posts));
        this.postUpdated.next(postData.posts);
        this.postsCopied = JSON.stringify (postData.posts);
        this.posts = postData.posts }, 90);
        this.postsCopied = JSON.stringify (postData.posts);
      console.log('Data from back end received!: ' +  JSON.stringify(postData.posts)) ;};
    // this.posts = JSON.stringify(postData); // .get method extracts and formats data for us from JSON > JS
     // ... = copy of x, prevents (accidental?) editing of posts.
  }); 
  console.log('justoutside Timeout: ' + this.posts);
  
  console.log('postsCopied: ' + this.postsCopied);
}

addPost(nameReceived: string, descriptionReceived: string){

  const post: PostInterface = {id: null, name: nameReceived, description: descriptionReceived,
  created: JSON.stringify(new Date()), rating: 'Non yet!' }
  //POST logic
}

getPostUpdateListener() {
  return this.postUpdated.asObservable();
}


}
