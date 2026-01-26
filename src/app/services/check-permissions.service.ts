import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Role } from '../enum/role.enum';

@Injectable({
  providedIn: 'root'
})
export class CheckPermissionsService {
  userDetails: any;
  constructor(private router: Router
    , private authService: AuthService
  ) { }

  checkUserModulePermission() {
    const sessionData = sessionStorage.getItem('userDetails');
    if (sessionData) {
      this.userDetails = JSON.parse(sessionData);
      if (this.userDetails) {
        if (this.userDetails.roleName === Role.Editor)
          this.router.navigate(['/dashboard']);

        if (this.userDetails.roleName === Role.User)
          this.router.navigate(['/dashboard/user']);
      }
      else {
        this.noUserAndPermissionFound();
      }
    }
    else {
      this.noUserAndPermissionFound();
    }
  }

  checkBlogModulePermission() {
    debugger
    const sessionData = sessionStorage.getItem('userDetails');
    if (sessionData) {
      this.userDetails = JSON.parse(sessionData);
      if (this.userDetails) {
        if (this.userDetails.roleName === Role.User)
          this.router.navigate(['/dashboard/user']);
      }
      else {
        this.noUserAndPermissionFound();
      }
    }
    else {
      this.noUserAndPermissionFound();
    }
  }

  checkAdminDashboardPermission() {
    const sessionData = sessionStorage.getItem('userDetails');
    if (sessionData) {
      this.userDetails = JSON.parse(sessionData);
      if (this.userDetails.roleName === Role.User)
        this.router.navigate(['/dashboard/user']);

      if (this.userDetails.roleName === Role.Editor)
        this.router.navigate(['/dashboard/user']);
    }
    else {
      this.noUserAndPermissionFound();
    }
  }

  checkEDitorAndUserDashboardPermission() {
    const sessionData = sessionStorage.getItem('userDetails');
    if (sessionData) {
      this.userDetails = JSON.parse(sessionData);
      if (this.userDetails.roleName === Role.Admin)
        this.router.navigate(['/dashboard']);
    }
    else {
      this.noUserAndPermissionFound();
    }
  }

  noUserAndPermissionFound() {
    this.authService.forceLogout();
    this.router.navigate(['/login']);
  }
}
