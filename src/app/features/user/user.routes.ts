import { Routes } from '@angular/router';
import { BlogCreateComponent } from '../blog/create-update/create-update.component';
import { authGuard } from '../../core/guards/auth.guard';
import { UserListComponent } from './user-list/user-list.component';
import { CreateUpdateComponent } from './create-update/create-update.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

export const userRoutes: Routes = [
  {
    path: '',
    component: UserListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'create',
    component: CreateUpdateComponent,
    canActivate: [authGuard]
  },
  {
    path: 'edit/:id',
    component: CreateUpdateComponent,
    canActivate: [authGuard]
  },
  {
    path: 'delete/:id',
    component: DeleteUserComponent,
    canActivate: [authGuard]
  },
  {
    path: 'change-Password',
    component: ChangePasswordComponent,
    canActivate: [authGuard]
  }
];


