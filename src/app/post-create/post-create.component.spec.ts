import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCreateComponent } from './post-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from 'express';
import { APIService } from '../services/api.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('PostCreateComponent', () => {
  let component: PostCreateComponent;
  let fixture: ComponentFixture<PostCreateComponent>;
  let router: Router;
  let apiService: APIService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [PostCreateComponent],
      providers: [APIService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCreateComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    apiService = TestBed.inject(APIService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should patch value of form', () => {
    const post = {
      userId: 1,
      title: 'Test Title',
      body: 'Test Body',
      id: 1,
    };
    apiService.clickedPost = post;
    component.ngOnInit();
    expect(component.postForm.value).toEqual(post);
  });

  it('should navigate to root when cancel button is clicked', () => {
    const navigateSpy = spyOn(router as any, 'navigate');
    component.cancel();
    expect(navigateSpy).toHaveBeenCalledWith(['']);
  });

  it('should add post when create button is clicked and not editing', () => {
    const addPostSpy = spyOn(apiService, 'addPost');
    component.createPost();
    expect(addPostSpy).toHaveBeenCalledWith(component.postForm.value);
  });

  it('should edit post when create button is clicked and editing', () => {
    const editPostSpy = spyOn(apiService, 'editPost');
    apiService.editing = true;
    component.createPost();
    expect(editPostSpy).toHaveBeenCalledWith(apiService.clickedPost);
  }); 
});
