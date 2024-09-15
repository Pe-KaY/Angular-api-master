import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import interfaces
import { user } from '../the-interfaces';
import { post } from '../the-interfaces';
// import rxjs behaviour subject
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  constructor(private http: HttpClient) {}

  // posts observable
  posts$ = new BehaviorSubject<post[]>([]);

  // posts local array
  postsArray: post[] = [];
  usersArray: user[] = [];
  clickedPost!: post;

  // get posts
  getPosts(): void {
    this.http
      .get<post[]>('https://jsonplaceholder.typicode.com/posts')
      .subscribe((posts) => {
        this.postsArray = posts;
        this.posts$.next(this.postsArray);
      });
  }

  // get users
  getUsers(): void {
    this.http
      .get<user[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe((users) => {
        this.usersArray = users;
      });
  }
}
