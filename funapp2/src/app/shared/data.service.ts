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
processBar: boolean;

  constructor (private http: HttpClient) { } // http lets you define your reqs types: post, get, etc

private posts: PostInterface[];
private postsUpdated = new Subject<PostInterface[]>(); // < -- to make little homies aware of new change to variable.

changeProcessBar(valueToPass: boolean){
  if (valueToPass === true) {
    this.processBar = true;
    return true;
  } else {
    this.processBar = false;
    return false;
  }
}

// data retreival from backend needs to be async.. takes time to transfer from backend.. set to 90ms here:
getPosts () {
  console.log ('getPosts() called');
  this.http.get<{message: string, posts: any}>(this.postAPIURI)
  // posts is type any because max got lazy no need to unsubscribe, angular does that itself for internal libraries
  .pipe(map((postDataStream) => {
    return postDataStream.posts.map(post => {
      return {
        id: post._id, // reassigning id value to backend's here.
        name: post.name,
        description: post.description,
        created: post.created,
        rating: post.rating,
      };
    });
  }))
  .subscribe( (transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
    // this.posts = JSON.stringify(postData); // .get method extracts and formats data for us from JSON > JS
     // ... = copy of x, prevents (accidental?) editing of posts.
     console.log('just after Timeout (within async): ' + (this.posts));
  });
  console.log('just outside Timeout (outside async): ' + this.posts);
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

  const postToSend: PostInterface = {id: '', name: nameReceived, description: descriptionReceived,
  created: currentDate.toUTCString(), rating: 'Non yet!' };


  // <-- IMPORTANT-->
  // This updates local list while only requesting backend's
  // id thru its res. Pushes to list array w/o calling
  // getPost() which would go thru the lenghtly process
  // of chatting w/ midware for backend query.
  this.http.post<{message: any, postId: string}>(this.postAPIURI, postToSend).subscribe( (responseDataPost) => {
    const id = responseDataPost.postId;
    postToSend.id = id;
    this.posts.push(postToSend);
    this.postsUpdated.next([...this.posts]);
  });

console.log('postsUpdated results after post: ' + this.postsUpdated);
}

getPostUpdateListener() {
  return this.postsUpdated.asObservable();
}

onEdit() {
  // edit logic
}

onDelete(postId: string) {
  const postURIForDelete = this.postAPIURI + postId;
  console.log('Id check from post-item: ' + postId);
  console.log('URI for delete: ' + postURIForDelete);
  this.http.delete<{message: string, id: string}>(postURIForDelete) // passed condensed to remove quotation marks.
  .subscribe( () => {
    const updatedPosts = this.posts.filter(post => post.id
      !== postId);
      // updates list locally by filtering out while back
      // end deletes from its own array.
      // moral of the story: update F.end & B.end lists seperaty.
      // this makes the app feel fast.
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    // console.log(deletedInfo.message);
    // console.log(deletedInfo.id);
  });      // string variables can be added to urls.. neat.
}

updatePost(postId: string, updatedName: string, updatedDescription: string,
  staticCreated: string, staticRating: string){
  
  const updatedInfo = { id: postId, name: updatedName, description: updatedDescription };
  const updatedInfoWithStatic = { id: postId, name: updatedName, description: updatedDescription,
  created: staticCreated, rating: staticRating }
  const postURIForUpdate = this.postAPIURI + postId;
  this.http.put( postURIForUpdate, updatedInfoWithStatic ).subscribe( response => {
  
  // <--- "immutable way of updating old post" :
    // Really important that you study whats happening here
    const updatedPosts = [...this.posts]; // <-- start update work w/ copied version
    const oldPostIndex = updatedPosts.findIndex(p => p.id === updatedInfo.id);
    updatedPosts[oldPostIndex] = {id: updatedInfo.id, name: updatedName, description: updatedDescription,
    created: staticCreated, rating: staticRating};
    console.log('Description : ' + updatedDescription );
    this.posts = updatedPosts; // <-- finish by assigning copied to main list.
    console.log('Response from backend: ')
    console.log(response);
    console.log(this.posts)

  // ---->
  }
  )
  console.log('id from postItem: ' + postId);



    // return {...this.posts.find(posts => posts.id === id)};  // related to post edit, treturns post that matches id.
}

needToIndex(id: string){
  const copiedPosts = [...this.posts]
  const foundItem = copiedPosts.findIndex(p => id === id);
  console.log(foundItem);
}

getPost(postId: string){
  console.log('id being received by getPost(): ' + postId);
  let postItem; 

  return this.http.get<{id: string, name: string, description: string,  created: string, rating: string, }>(this.postAPIURI + postId)
  .subscribe(updatedPost => {

    postItem = {id: updatedPost.id, name: updatedPost.name, description: updatedPost.description,
    created: updatedPost.created, rating: updatedPost.rating };

    return postItem;
  // http is an observable, Angular wont accept is a sync dsts.
  // instead, accept it with subscribe in outside component using the service.
    // return {...this.posts.find(posts => posts.id === id)};  // related to post edit, treturns post that matches id.
});
}

}



// -------->

// Left off with this in mind:

// id being passed from post-item is undefined because we kept it alive as an empty string
// in all areas of code not involving backend. Backend now includes _id and frontend id as attributes.
// TO DO: remove ur id & assign DB's id globally.
