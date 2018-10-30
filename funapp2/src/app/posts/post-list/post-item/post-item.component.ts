// Prep for the MOTHER of ALL boilerplate code.. holy!

import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { RouterModule, ActivatedRoute,
ActivatedRouteSnapshot, ParamMap } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {

itemAvailable = false;
finalItem: any;
newEdit: boolean;
@Output() itemFelt = new EventEmitter <any> ();

  @Input() postItem: {
  id: string,
  name: string,
  description: string,
  created: any,
  rating: any,
};

delayedPostItem: {
  name: string;
  description: string;
  created: any;
  rating;
};

id;
name;
description;
created;
rating;
newName;
newDescription;


// Need individual promises for item objects items because
// template of being unforgiving.... gah!:

asyncPostItem: any;        // async names should really be of type Promise<any> but redefined later
asyncPostItemId: any;      // to be able to attach directly to live subscription of postItem under a f(x)
asyncPostItemName: any;    // Boiler plates become an issue VERY quickly.. learn to add depth to classes
asyncPostItemDescription: any; // functions!
asyncPostItemCreated: any;
asyncPostItemRating: any;
// asyncPostItemId: Promise <any>;
editAreaNeeded = false;
progressBar = false;


constructor(private data: DataService, public route: ActivatedRoute) {
  this.asyncPostItem = this.getPromise();

  this.asyncPostItemId = this.getIdPromise();
  this.asyncPostItemName = this.getNamePromise();
  this.asyncPostItemDescription = this.getDescriptionPromise();

  this.asyncPostItemCreated = this.getCreatedPromise();
  this.asyncPostItemRating = this.getRatingPromise(); 
}

  ngOnInit() {


    // let following go as im working w/ imbedded components. ID being passed in ts instead:
    // this.route.paramMap.subscribe( (paramMap: ParamMap) => {
    //   console.log(paramMap);
    //   if (paramMap.has('postId')){
    //     const postId = paramMap.get('postId');
    //     console.log('hi, post ID in param!');
    //   }
    // })


      this.id = JSON.stringify(this.postItem.id);

      this.name = JSON.stringify(this.postItem.name);

      this.description = JSON.stringify(this.postItem.description);

      this.created = JSON.stringify(this.postItem.created);

      this.rating = JSON.stringify(this.postItem.rating);

      this.finalItem = JSON.stringify(this.postItem);




      // wanaBTS; calling function saved under variable, use later.

// const wanaBTS = () => {          // <-- function saved under variable.
//   this.postItem.name = 'name';
// }


    // this.postItem = [{name: 'box', description: 'cube', created: 'whenever', rating:'suks'}]

  }

// Boiler plate GALORE:

getPromise() {

  return new Promise((resolve, reject ) => {
    setTimeout(() => resolve (this.finalItem), 1000);
  });
}

getIdPromise() {

  return new Promise ((resolve, reject) => {
    setTimeout( () => resolve(this.id), 300);
  });
}


getNamePromise() {
if (!this.newEdit){
  return new Promise((resolve, reject ) => {
    setTimeout(() => resolve (this.name), 300);
  });
} else {
  return new Promise((resolve, reject ) => {
    setTimeout(() => resolve (this.newName), 300);
  });
}
}

getDescriptionPromise() {

  if (!this.newEdit){
    return new Promise((resolve, reject ) => {
      setTimeout(() => resolve (this.description), 300);
    });
  } else {
    return new Promise((resolve, reject ) => {
      setTimeout(() => resolve (this.newDescription), 300);
    });
  }
}

getCreatedPromise() {

  return new Promise((resolve, reject ) => {
    setTimeout(() => resolve (this.created), 300);
  });
}

getRatingPromise() {

  return new Promise((resolve, reject ) => {
    setTimeout(() => resolve (this.rating), 300);
  });
}
// end of boiler fuckery, fix this thing...

onEdit() {
  this.editAreaNeeded = !this.editAreaNeeded;
  this.newName = this.postItem.name;
  this.newDescription = this.postItem.description;
  
}

onDelete() {
  this.data.onDelete(this.postItem.id);
  console.log('onDelete() clicked for: ' + this.id);
  // setTimeout( () => {this.data.getPosts(); }, 200);
}

onSaveEdit(){

  this.progressBar = this.data.changeProcessBar(true);

  if (this.progressBar === true) {
    console.log('hi, process bar set to true');
  };

  this.newEdit =  true;
  console.log('onSaveEdit() reached!');
  console.log('onEdit() clicked, newName: ' + this.newName
  + ' newDescription: ' + this.newDescription);
  this.data.updatePost(this.postItem.id, this.newName, this.newDescription, 
    this.postItem.created, this.postItem.rating);
  console.log(' initial info sent to dataService : ');
  console.log(this.postItem);
  this.data.getPost(this.postItem.id) // upDatedPost.content should be desc. Fix!
    
    console.log('updatedpost after getPost()!: ');

    console.log('updatedPost.description : ');


    // this.asyncPostItem = updatedPost;     
    this.asyncPostItemId = this.getIdPromise();    
    this.asyncPostItemName = this.getNamePromise();
    this.asyncPostItemDescription = this.getDescriptionPromise();
    this.asyncPostItemCreated = this.getCreatedPromise();
    this.asyncPostItemRating = this.getRatingPromise();
    // console.log('updatedPost.id after update: ' + updatedPost.id);

    this.newEdit = false;
    this.progressBar = this.data.changeProcessBar(false);
  }
  
}

