import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
// import api service
import { APIService } from '../services/api.service';
// import interfaces
import { post } from '../the-interfaces';
import { comment } from '../the-interfaces';
// import comments component to render comments
import { CommentComponent } from '../comment/comment.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommentComponent, CommonModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss',
})
export class PostDetailComponent {
  constructor(public api: APIService, private route: Router) {}

  clickedPost!: post;
  postComment$!: Observable<comment[]>;

  ngOnInit(): void {
    this.clickedPost = this.api.clickedPost;
    this.postComment$ = this.api.getComments(this.clickedPost.id);
  }

  randomStatus() {
    return Math.random() > 0.5;
  }

  goBack() {
    this.route.navigate(['']);
    this.api.clickedPost = {
      userId: 0,
      title: '',
      body: '',
      id: 0,
    };
  }

  editPost() {
    this.route.navigate(['post-create']);
    this.api.editing = true;
  }

  deletePost(id: number) {
    this.api.deletePost(id);
  }
}
