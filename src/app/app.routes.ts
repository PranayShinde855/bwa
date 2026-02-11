import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../app/features/auth/auth.module').then((m) => m.AuthModule)

  },
  {
    path: 'blogs',
    loadChildren: () =>
      import('./features/blog/blog.routes').then((m) => m.blogRoutes),
    canActivate: [authGuard]
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./features/user/user.routes').then((m) => m.userRoutes),
    canActivate: [authGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    // This is public API
    path: 'blog-list',
    loadChildren: ()=> import('./features/public/public.module').then((m)=> m.PublicModule)
  }
];
