import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from '../posts/posts.component';
import { APIService } from '../services/api.service';
import { post } from '../the-interfaces';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [PostsComponent, CommonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent {
  constructor(private api: APIService, private route: Router) {}

  posts$!: Observable<post[]>;

  ngOnInit(): void {
    if(this.api.postsArray.length > 0){
      this.posts$ = this.api.posts$;
      return
    }

    this.posts$ = this.api.posts$;
    this.api.getPosts();
    this.api.getUsers();
  }

  addPost() {
    this.route.navigate(['post-create']);
  }
}
