import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { Subscription } from 'rxjs';
import { PostInterface } from 'src/app/shared/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: PostInterface[] = [];
  private postsSub: Subscription;

  constructor(private data: DataService) {

  }

  ngOnInit() {
    this.data.getPosts();
    this.data.getPostUpdateListener()
    .subscribe((request: PostInterface[]) => {
      console.log('Asking for data from service: ');
      this.posts = request.reverse();
      console.log(request);
      console.log(this.posts);
      // this.delayedPosts = this.posts;
    });
      console.log('after subscribe: ');
      console.log(this.posts);

      // console.log(this.postsSub); getting errors w/ subscribe.. compare against example later.


  }

  // ngOnDestroy(){ // not killing this causes a "memory leak"
  //   this.postsSub.unsubscribe;
  // }

}
