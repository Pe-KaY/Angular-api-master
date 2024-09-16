import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { APIService } from './api.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';


describe('APIService', () => {
  let service: APIService;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [APIService, { provide: Router, useValue: { navigate: () => {} } }]
    });

    service = TestBed.inject(APIService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    // Ensure that there are no outstanding requests after each test
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get posts', () => {
    const mockPosts = [
      { id: 1, title: 'Test Post', body: 'Test Body', userId: 1 }
    ];

    service.getPosts();

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts');
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);

    service.posts$.subscribe(posts => {
      expect(posts.length).toBeGreaterThan(0);
      expect(posts).toEqual(mockPosts);
    });
  });

  it('should add post', () => {
    const newPost = { title: 'New Post', body: 'New Body', userId: 1 } as any;
    const mockResponse = { id: 1, ...newPost };

    spyOn(window, 'fetch').and.returnValue(Promise.resolve({
      json: () => Promise.resolve(mockResponse)
    } as any));

    service.addPost(newPost);

    setTimeout(() => {
      service.posts$.subscribe(posts => {
        expect(posts.length).toBeGreaterThan(0);
        expect(posts[0]).toEqual(mockResponse);
      });
    }, 0);
  });

  it('should edit post', () => {
    const post = { id: 1, title: 'Updated Title', body: 'Updated Body', userId: 1 };

    spyOn(window, 'fetch').and.returnValue(Promise.resolve({
      json: () => Promise.resolve(post)
    } as any));

    service.clickedPost = post;
    service.editPost(post);

    setTimeout(() => {
      service.posts$.subscribe(posts => {
        expect(posts.some(p => p.id === post.id && p.title === 'Updated Title')).toBeTrue();
      });
    }, 0);
  });

  it('should delete post', () => {
    const id = 1;
    const mockPosts = [{ id: 1, title: 'Test Post', body: 'Test Body', userId: 1 }];

    spyOn(window, 'fetch').and.returnValue(Promise.resolve({} as any));

    service.postsArray = mockPosts;
    service.deletePost(id);

    setTimeout(() => {
      service.posts$.subscribe(posts => {
        expect(posts.length).toBe(0);
      });
    }, 0);
  });
});
