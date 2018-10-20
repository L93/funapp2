import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { PostInterface } from 'src/app/shared/post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {


  name;
  description;

  constructor(private data: DataService) { }

  ngOnInit() {


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
