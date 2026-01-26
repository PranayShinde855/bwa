import { Routes } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogCreateComponent } from './blog-create/blog-create.component';
import { BlogDeleteComponent } from './blog-delete/blog-delete.component';
import { authGuard } from '../../guards/auth.guard';

export const blogRoutes: Routes = [
  {
    path: '',
    component: BlogListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'create',
    component: BlogCreateComponent,
    canActivate: [authGuard]
  },
  {
    path: 'edit/:id',
    component: BlogCreateComponent,
    canActivate: [authGuard]
  },
  {
    path: 'delete/:id',
    component: BlogDeleteComponent,
    canActivate: [authGuard]
  }
];


