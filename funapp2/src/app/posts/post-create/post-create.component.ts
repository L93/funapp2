import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostInterface } from 'src/app/shared/post.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from 'src/app/posts/post-create/mime-type.validator';

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
  form: FormGroup;
  imagePreview: string;

  constructor(private data: DataService, public route: ActivatedRoute) { }

  ngOnInit() {
    // <<-- new form logic -->>

    this.form = new FormGroup({

      'name': new FormControl(null, {validators: [Validators.required, Validators.minLength(3)] }),

      'description': new FormControl(null, {validators: [Validators.required]}),

      'image' : new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
      // angular differentiates beween sync & async validators
      // mimeType validator only takes png/jpg/jpeg.

    });


    // << -- end of new from logic -->>
    this.route.paramMap.subscribe( (paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.post = this.data.getPost(this.postId);
        console.log('post.Id being asked for: ' + this.postId);
        console.log('post returned from service: ' + this.post);
        console.log('route currently on: ' + this.route);
      } else {
        this.mode = 'create';
        this.postId = null;
    }
    }); // paramMap is an Angular obersavble, so no need to unsubscribe manually.
    // working w/ obsevable to track url parameters because that could change at any time!

  }

  onClick(whichForm: number) {

    if (this.form.invalid) {
      console.log('Form is invalid human, try harder.');
      return;
    } else { console.log('Well done, form valid!');
    }

    if (whichForm === 1) {

        this.data.addPost(this.name, this.description,
          this.form.value.image);
        // had getPost here() not idea as it requests a new list from back bend thru data with created posts.

        console.log(this.name + ' ' + this.description);
        this.name = '';
        this.description = '';
    } else if ( whichForm === 2 ) {

      this.data.addPost(this.form.value.name, this.form.value.description,
      this.form.value.image);
    }


  }

  onImageUpload(event: Event) { //            Event is native to angular, no need to import.
    const file = (event.target as HTMLInputElement).files[0];

    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    console.log(file);
    console.log(this.form);

    const reader = new FileReader;
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

}
