import { Routes } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogCreateComponent } from '../blog/create-update/create-update.component';
import { authGuard } from '../../core/guards/auth.guard';
import { BlogDeleteComponent } from './delete-blog/delete-blog.component';
import { ViewblogComponent } from './viewblog/viewblog.component';

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
  },
    {
    path: 'view/:id',
    component: ViewblogComponent,
    canActivate: [authGuard]
  }
];


