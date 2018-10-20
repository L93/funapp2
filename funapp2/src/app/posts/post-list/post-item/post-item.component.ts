// Prep for the MOTHER of ALL boilerplate codes.. holy!

import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {

itemAvailable = false;
finalItem: any;

  @Input() postItem: {
  name: string;
  description: string;
  created: any;
  rating;
};

delayedPostItem: {
  name: string;
  description: string;
  created: any;
  rating;
};

name;
description;
created;
rating;


// Need individual promises for item objects items because
// template of being unforgiving.... gah!:

asyncPostItem: Promise<any>;
asyncPostItemName: Promise <any>;
asyncPostItemDescription: Promise <any>;
asyncPostItemCreated: Promise <any>;
asyncPostItemRating: Promise <any>;
// asyncPostItemId: Promise <any>;


constructor(private data: DataService) {
  this.asyncPostItem = this.getPromise();

  this.asyncPostItemName = this.getNamePromise();
  this.asyncPostItemDescription = this.getDescriptionPromise();

  this.asyncPostItemCreated = this.getCreatedPromise();
  this.asyncPostItemRating = this.getRatingPromise()
;  }

  ngOnInit() {

    console.log(JSON.stringify(this.postItem));

    setTimeout( () => { // delay increases with every component... LEARN TO ASYNC!
      const cleanedPost = JSON.stringify(this.postItem);
      console.log(cleanedPost);

      this.delayedPostItem = this.postItem;

      this.name = JSON.stringify(this.delayedPostItem.name);
      console.log('name: ' + this.name);

      this.description = JSON.stringify(this.delayedPostItem.description);
      console.log('description: ' + this.description);

      this.created = JSON.stringify(this.delayedPostItem.created);
      console.log('created: ' + this.created);

      this.rating = JSON.stringify(this.delayedPostItem.rating);
      console.log('rating: ' + this.rating);

      this.finalItem = JSON.stringify(this.delayedPostItem);


      // wanaBTS; calling function saved under variable, use later.
    }, 1000);


// const wanaBTS = () => {          // <-- function saved under variable.
//   this.postItem.name = 'name';
// }


    // this.postItem = [{name: 'box', description: 'cube', created: 'whenever', rating:'suks'}]

  }

// Boiler plate GALORE:

getPromise() {

  return new Promise((resolve, reject ) => {
    console.log('getPromise() called');
    
    setTimeout(() => resolve (this.finalItem), 2000);
  });
}

getNamePromise() {

  return new Promise((resolve, reject ) => {
    console.log('getNamePromise() called');
    setTimeout(() => resolve (this.name), 2000);
  });
}

getDescriptionPromise() {

  return new Promise((resolve, reject ) => {
    console.log('getDescriptionPromise() called');
    setTimeout(() => resolve (this.description), 2000);
  });
}

getCreatedPromise() {

  return new Promise((resolve, reject ) => {
    console.log('getCreatedPromise() called: ');
    setTimeout(() => resolve (this.created), 2000);
  });
}

getRatingPromise() {

  return new Promise((resolve, reject ) => {
    console.log('getCreatedPromise() called: ');
    setTimeout(() => resolve (this.rating), 2000);
  });
}
// end of boiler fuckery, fix this thing... 

onEdit(){
  console.log('onEdit() clicked');
}

onDelete(postId: string){
  console.log(postId);
  this.data.onDelete(postId);
  console.log('onDelete() clicked');
}

}
