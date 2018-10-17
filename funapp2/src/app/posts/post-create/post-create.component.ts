import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor(private data: DataService) { }

  ngOnInit() {

  
  }

  oncCick() {

      const clickData = {
        name: 'testName',
        description: 'testDescription',
        created: 'testCreatedDate',
        rating: 'testRating'
      }

  }

}
