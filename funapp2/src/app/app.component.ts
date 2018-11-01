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

  approved: boolean;

  ngOnInt() {
<<<<<<< HEAD
    this.approved = true;
  }

  changeApproveStatus(newChange: boolean){
    this.approved = newChange;
  }
=======
  }


>>>>>>> 5670fc2e4d27b34190d68a74c3906bc4f6052a61
}


