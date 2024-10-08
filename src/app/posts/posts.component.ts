import { Component, Input } from '@angular/core';
import { post } from '../the-interfaces';
import { APIService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  constructor(public api: APIService, private route: Router) {}

  @Input('post') post!: post;


  // assings post clicked to service postclicked
  postClicked(post: post) {
    this.api.clickedPost = post;
    this.api.randomStatus();
    this.route.navigate(['posts-detail']);
  }
}
