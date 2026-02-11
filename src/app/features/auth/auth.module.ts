import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { reverseGuardGuard } from '../../core/guards/reverse.guard';

const routes = [
  {
    path:'',
    component: LoginComponent,
    canActivate: [reverseGuardGuard]
  },
  {
    path:'register',
    component: RegisterComponent,
    canActivate: [reverseGuardGuard]
  }
]

@NgModule({
  declarations: [
  ],
  imports: [
    LoginComponent,
    RegisterComponent,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule {
  constructor(){
    console.log("Auth Module");
  }
 }
