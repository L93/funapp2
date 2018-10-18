import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { FormGroup, FormControl } from '@angular/forms';

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

      const clickData = {
        name: this.name,
        description: this.description,
        created: 'CreatedByUser',
        rating: 'RatingByUser',
      };

    this.data.addPost(this.name, this.description);

        console.log(this.name + ' ' + this.description);
  }

}
