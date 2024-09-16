import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListComponent } from './post-list.component';
import { post } from '../the-interfaces';
import { Router } from '@angular/router';
import { APIService } from '../services/api.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let router: Router;
  let apiService: APIService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PostListComponent],
      providers: [APIService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    apiService = TestBed.inject(APIService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should patch value of form', () => {
    const posts: post[] = [
      {
        id: 1,
        userId: 1,
        title: 'Test Title',
        body: 'Test Body',
      },
    ];
    apiService.postsArray = posts;
    component.ngOnInit();
    expect(component.posts$).toEqual(apiService.posts$);
  });

  it('should navigate to root when cancel button is clicked', () => {
    const navigateSpy = spyOn(router as any, 'navigate');
    component.addPost();
    expect(navigateSpy).toHaveBeenCalledWith(['post-create']);
  });})
