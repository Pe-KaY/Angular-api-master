import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';

import { APIService } from '../services/api.service';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
})
export class PostCreateComponent {
  postForm!: FormGroup;

  constructor(
    private api: APIService,
    private fb: FormBuilder,
    private route: Router
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.api.clickedPost) {
      this.postForm.patchValue({
        title: this.api.clickedPost.title,
        body: this.api.clickedPost.body,
      });
    }
  }

  createPost() {
    // check if editing
    if (this.api.editing) {
      this.api.editPost(this.api.clickedPost);
      return;
    }
    // if not editing, create post
    this.api.addPost(this.postForm.value);
    this.postForm.reset();
  }

  cancel() {
    this.route.navigate(['']);
    this.api.clickedPost = {
      userId: 0,
      title: '',
      body: '',
      id: 0,
    };
  }
}
