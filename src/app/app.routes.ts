import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.authRoutes),
    canActivate: [authGuard]

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
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then((m) => m.dashboardRoutes),
    canActivate: [authGuard]
  }
];
