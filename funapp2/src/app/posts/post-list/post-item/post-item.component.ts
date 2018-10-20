// Prep for the MOTHER of ALL boilerplate codes.. holy!

import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { RouterModule, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {

itemAvailable = false;
finalItem: any;
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


// Need individual promises for item objects items because
// template of being unforgiving.... gah!:

asyncPostItem: Promise<any>;
asyncPostItemId: Promise<any>;
asyncPostItemName: Promise <any>;
asyncPostItemDescription: Promise <any>;
asyncPostItemCreated: Promise <any>;
asyncPostItemRating: Promise <any>;
// asyncPostItemId: Promise <any>;


constructor(private data: DataService) {
  this.asyncPostItem = this.getPromise();

  this.asyncPostItemId = this.getIdPromise();
  this.asyncPostItemName = this.getNamePromise();
  this.asyncPostItemDescription = this.getDescriptionPromise();

  this.asyncPostItemCreated = this.getCreatedPromise();
  this.asyncPostItemRating = this.getRatingPromise()
;  }

  ngOnInit() {

    console.log(JSON.stringify(this.postItem));

    setTimeout( () => { // delay increases with every component... LEARN TO ASYNC!

      this.delayedPostItem = this.postItem;

      this.id = JSON.stringify(this.postItem.id);

      this.name = JSON.stringify(this.delayedPostItem.name);

      this.description = JSON.stringify(this.postItem.description);

      this.created = JSON.stringify(this.postItem.created);

      this.rating = JSON.stringify(this.postItem.rating);

      this.finalItem = JSON.stringify(this.postItem);


      // wanaBTS; calling function saved under variable, use later.
    }, 0);


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

  return new Promise((resolve, reject ) => {
    setTimeout(() => resolve (this.name), 300);
  });
}

getDescriptionPromise() {

  return new Promise((resolve, reject ) => {
    setTimeout(() => resolve (this.description), 300);
  });
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
  console.log('onEdit() clicked');
  // this.itemFelt.felt()
}

onDelete() {
  this.data.onDelete(this.postItem.id);
  console.log('onDelete() clicked for: ' + this.id);
  // setTimeout( () => {this.data.getPosts(); }, 200);
}

}
