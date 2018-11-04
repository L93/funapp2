import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { PostInterface } from 'src/app/shared/post.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-disregardone',
  templateUrl: './disregardone.component.html',
  styleUrls: ['./disregardone.component.css']
})
export class DisregardoneComponent implements OnInit {

  name;
  description;

  constructor(private data: DataService, public route: ActivatedRoute) { }

  ngOnInit() {


  }


  // onClick() { // following has no use case:
  //     const clickData: PostInterface = {
  //       id: '',
  //       name: this.name,
  //       description: this.description,
  //       created: 'CreatedByUser',
  //       rating: 'RatingByUser',
  //     };

  //     console.log('create tab info: ' + JSON.stringify(clickData));
  //   this.data.addPost(this.name, this.description,
  //     this.form.value.image);
  //   // had getPost here() not ideal as it requests a new list from back bend thru data with created posts.

  //   console.log(this.name + ' ' + this.description);
  //   this.name = '';
  //   this.description = '';
  // }

}
