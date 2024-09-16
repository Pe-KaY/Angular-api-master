import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsComponent } from './posts.component';
import { APIService } from '../services/api.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let router: Router;
  let apiService: APIService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PostsComponent],
      providers: [APIService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    apiService = TestBed.inject(APIService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to post detail', () => {
    const navigateSpy = spyOn(router as any, 'navigate');
    component.postClicked(component.post);
    expect(navigateSpy).toHaveBeenCalledWith(['posts-detail']);
  });})
