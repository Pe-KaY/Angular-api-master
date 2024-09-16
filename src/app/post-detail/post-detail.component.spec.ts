import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailComponent } from './post-detail.component';
import { APIService } from '../services/api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

describe('PostDetailComponent', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;
  let router: Router;
  let apiService: APIService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [PostDetailComponent],
      providers: [APIService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    apiService = TestBed.inject(APIService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to root when cancel button is clicked', () => {
    const navigateSpy = spyOn(router as any, 'navigate');
    component.goBack();
    expect(navigateSpy).toHaveBeenCalledWith(['']);
  });

  it('should navigate to post-create when edit button is clicked', () => {
    const navigateSpy = spyOn(router as any, 'navigate');
    component.editPost();
    expect(navigateSpy).toHaveBeenCalledWith(['post-create']);
  });
});
