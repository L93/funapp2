import { Component } from '@angular/core';
import { DataService } from './shared/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
constructor(private data: DataService){}

  title = 'funapp';

  approved: boolean

  ngOnInt() {
    this.approved = false
  }

  changeApproveStatus(newChange: boolean){
    this.approved = newChange;   
  }
}


