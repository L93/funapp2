import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostInterface } from 'src/app/shared/post.model';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {


  name;
  description;
  private mode = 'create';
  postId: string;
  private post;
  // <<-- NEW form input logic -->>
  form: FormGroup;

  constructor(private data: DataService, public route: ActivatedRoute) { }

  ngOnInit() {
    // <<-- new form logic -->>

    this.form = new FormGroup({

      'name': new FormControl(null, {validators: [Validators.required, Validators.minLength(3)] }),
      'description': new FormControl(null, {validators: [Validators.required]})

    });
    // << -- end of new from logic -->>
    this.route.paramMap.subscribe( (paramMap: ParamMap) => {
      if (paramMap.has('postId')){
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.post = this.data.getPost(this.postId);
        console.log('post.Id being asked for: ' + this.postId);
        console.log('post returned from service: ' + this.post);
        console.log('route currently on: ' + this.route);
      } else {
        this.mode = 'create';
        this.postId = null;
    };
    }); // paramMap is an Angular obersavble, so no need to unsubscribe manually.
    // working w/ obsevable to track url parameters because that could change at any time!

  }

  onClick() {

      const clickData: PostInterface = {
        id: '',
        name: this.name,
        description: this.description,
        created: 'CreatedByUser',
        rating: 'RatingByUser',
      };

    this.data.addPost(this.name, this.description);
    // had getPost here() not idea as it requests a new list from back bend thru data with created posts.

    console.log(this.name + ' ' + this.description);
    this.name = '';
    this.description = '';
  }

}
