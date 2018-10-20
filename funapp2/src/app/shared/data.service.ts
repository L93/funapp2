import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { PostInterface } from 'src/app/shared/post.model';
import { map } from 'rxjs/operators';
import { post } from 'selenium-webdriver/http';

@Injectable({providedIn: 'root' }) // <-- ?? what is this
export class DataService {
private postAPIURI = 'http://localhost:49175/api/posts/';

  constructor (private http: HttpClient) { } // http lets you define your reqs types: post, get, etc

private posts: PostInterface[];
private postsUpdated = new Subject<PostInterface[]>(); // < -- to make little homies aware of new change to variable.

// data retreival from backend needs to be async.. takes time to transfer from backend.. set to 90ms here:
getPosts () {
  console.log ('getPosts() called');
  this.http.get<{message: string, posts: any}>(this.postAPIURI)
  // posts is type any because max got lazy no need to unsubscribe, angular does that itself for internal libraries
  .pipe(map((postDataStream) => {
    return postDataStream.posts.map(post => {
      return {
        name: post.name,
        description: post.description,
        created: post.created,
        rating: post.rating,
        id: post._id
      }
    })
  }))
  .subscribe( (transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]) 
    // this.posts = JSON.stringify(postData); // .get method extracts and formats data for us from JSON > JS
     // ... = copy of x, prevents (accidental?) editing of posts.
     console.log('justoutside Timeout (within async): ' + JSON.stringify(this.posts));
  });
  console.log('justoutside Timeout (outside async): ' + this.posts);
}
/*
Max's example of pipe: // apply this logic to above getPost()

getPosts() {
  this.http
  .get<{ message: string; posts: any }>(
    this.postAPIURI
  )
  .pipe(map((postData) => { <- rxjs autmaticly wraps postData into an observable thru in order for it to work
    ^  with subscribe. Since subscribe only woks with observables.
    
    return postData.posts.map(post => {
      return {
        title: post.title,
        content: post.content,
        id: post._id  <-- converting element array receiced from server into new & diff array, returning the obj to 
      }               ^ the encapsuling variable which maintains its observable quality w/ pipe that allows processing by
    })                ^ subscribe()
  }))
  .subscribe (transformedPosts => {   <-- remember, tranformedPosts var could be anything, reps data stream being passed down.
    this.posts = transformedPosts;
    this.postsUpdated.next([...this posts]);
  });
}


*/
addPost(nameReceived: string, descriptionReceived: string) {

  const currentDate = new Date();

  const post: PostInterface = {id: '', name: nameReceived, description: descriptionReceived,
  created: currentDate.toUTCString(), rating: 'Non yet!' };
  
  this.http.post<{message: any}>(this.postAPIURI, post).subscribe( (responseDataPost) => {
    console.log('from server on succesful post: '+ responseDataPost.message);
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  });

console.log('postsUpdated results after post: ' + this.postsUpdated);
}

getPostUpdateListener() {
  return this.postsUpdated.asObservable();
}

onEdit(){
  // edit logic
}

onDelete(postId: string){
  this.http.delete<{message: string, id: string}>(this.postAPIURI + postId)
  .subscribe( () => { console.log('Deleted! - data.service')
    // console.log(deletedInfo.message);
    // console.log(deletedInfo.id);
  });      // string variables can be added to urls.. neat.
};


}



// -------->

// Left off with this in mind:

// id being passed from post-item is undefined because we kept it alive as an empty string
// in all areas of code not involving backend. Backend now includes _id and frontend id as attributes.
// TO DO: remove ur id & assign DB's id globally.