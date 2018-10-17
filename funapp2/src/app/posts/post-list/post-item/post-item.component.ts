import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent {

itemAvailable = false;

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

asyncPostItem: Promise<any>;


constructor(private data: DataService) { 
  this.asyncPostItem = this.getPromise()
  }

  ngOnInit() {

    console.log(JSON.stringify(this.postItem));

    setTimeout( () => { // delay increases with every component... LEARN TO ASYNC!
      this.itemAvailable = true;
      const cleanedPost = JSON.stringify(this.postItem);
      console.log(cleanedPost);

      this.delayedPostItem = this.postItem;
      
      this.name = JSON.stringify(this.delayedPostItem.name);
      console.log(this.name);
      
      
      // wanaBTS; calling function saved under variable, use later.
    }, 1000)
    

// const wanaBTS = () => {          // <-- function saved under variable.
//   this.postItem.name = 'name';
// }

    
    // this.postItem = [{name: 'box', description: 'cube', created: 'whenever', rating:'suks'}]
 
  }

getPromise(){

  return new Promise((resolve, reject ) => {
    console.log('getPromise() called')
    setTimeout(() => resolve ('async works!'), 2000); 
  });
}
}
