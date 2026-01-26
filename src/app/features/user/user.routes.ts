import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { authGuard } from '../../guards/auth.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';

export const userRoutes: Routes = [
  {
    path: '',
    component: UserListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'create',
    component: UserCreateComponent,
    canActivate: [authGuard]
  },
  {
    path: 'edit/:id',
    component: UserCreateComponent,
    canActivate: [authGuard]
  },
  {
    path: 'change-Password',
    component: ChangePasswordComponent,
    canActivate: [authGuard]
  }
];
