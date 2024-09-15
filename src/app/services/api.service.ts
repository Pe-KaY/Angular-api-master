import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// import interfaces
import { user } from '../the-interfaces';
import { post } from '../the-interfaces';
import { comment } from '../the-interfaces';
import { newpost } from '../the-interfaces';

// import rxjs behaviour subject
import { BehaviorSubject, catchError, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  constructor(private http: HttpClient, private router: Router) {}

  // posts observable
  posts$ = new BehaviorSubject<post[]>([]);
  randomstatus: boolean = false;

  // posts local array
  postsArray: post[] = [];
  usersArray: user[] = [];
  clickedPost!: post;
  idCount: number = 1;
  editing: boolean = false;

  // random status
  randomStatus() {
    return Math.random() > 0.5
      ? (this.randomstatus = true)
      : (this.randomstatus = false);
  }

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
      .pipe(
        retry(2),
        catchError((err) => {
          throw new Error(`Error: ${err}`);
        })
      )
      .subscribe((users) => {
        console.log(users);
        this.usersArray = users;
      });
  }

  // get username
  getUserName(id: number): string {
    return this.usersArray.find((user) => user.id === id)?.name || '';
  }

  // get comments using query parameters
  getComments(Id: number) {
    let params = {
      postId: Id.toString(),
    };

    return this.http
      .get<comment[]>('https://jsonplaceholder.typicode.com/comments', {
        params,
      })
      .pipe(
        retry(2),
        catchError((err) => {
          throw new Error(`Error: ${err}`);
        })
      );
  }

  // Post
  addPost(post: newpost) {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: post.title,
        body: post.body,
        userId: 100,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: 'Bearer fake-jwt-token',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.postsArray = [
          { ...data, id: data.id + this.idCount },
          ...this.postsArray,
        ];
        this.idCount++;
        this.posts$.next(this.postsArray);
        this.router.navigate(['']);
      })
      .catch((err) => console.log(`Error: ${err}`));
  }

  // Put
  editPost(post: post) {
    fetch(`https://jsonplaceholder.typicode.com/posts/100`, {
      method: 'PUT',
      body: JSON.stringify({
        id: post.id,
        title: post.title,
        body: post.body,
        userId: 102,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: 'Bearer fake-jwt-token',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.postsArray = this.postsArray.map((p) => {
          if (p.id === this.clickedPost.id) {
            return { ...data, id: this.clickedPost.id };
          }
          return p;
        });
        // update posts
        this.posts$.next(this.postsArray);
        // reset clicked post
        this.clickedPost = {
          userId: 0,
          title: '',
          body: '',
          id: 0,
        };
        // back to home
        this.router.navigate(['']);
      })
      .catch((err) => console.log(`Error: ${err}`));
  }

  // Delete
  deletePost(id: number) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer fake-jwt-token',
      },
    }).then(() => {
      this.postsArray = this.postsArray.filter((post) => post.id !== id);
      this.posts$.next(this.postsArray);
    });
    this.router.navigate(['']).catch((err) => console.log(`Error: ${err}`));
  }
}
