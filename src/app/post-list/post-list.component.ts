import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from '../posts/posts.component';
import { APIService } from '../services/api.service';
import { post } from '../the-interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [PostsComponent, CommonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent {
  constructor(private api: APIService) {}

  posts$!: Observable<post[]>;

  ngOnInit(): void {
    this.posts$ = this.api.posts$;
    this.api.getPosts();
    this.api.getUsers();
  }


}
