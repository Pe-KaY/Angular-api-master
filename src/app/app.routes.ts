import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./post-list/post-list.component').then(
        (m) => m.PostListComponent
      ),
  },
  {
    path: 'posts-detail',
    loadComponent: () =>
      import('./post-detail/post-detail.component').then(
        (m) => m.PostDetailComponent
      ),
  },
  {
    path: 'post-create',
    loadComponent: () =>
      import('./post-create/post-create.component').then(
        (m) => m.PostCreateComponent
      ),
  },
];
