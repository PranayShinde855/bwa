import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core//services/auth.service';
import { UserService } from '../../../core//services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
//import { switchMap } from 'rxjs';
import { SharedMaterialModule } from '../../../sharedModule/shared-material.module';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule
    , SharedMaterialModule
  ],
  // providers: [AuthService],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  isLoading: boolean = false;
  returnUrl: string;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    this.createForm();
    if (isPlatformBrowser(this.platformId)) {
      this.authService.forceLogout();
      sessionStorage.clear();
    }
  }

  createForm() {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  logIn() {
    this.isLoading = true;
    const loginRequest = this.loginForm.value;
    this.authService.login(loginRequest).pipe(
      switchMap(res => {
  
        if (!res?.data?.token) {
          throw new Error('Token not received');
        }
        sessionStorage.setItem('token', res.data.token);
        return this.userService.getUserDetails();
      })
    ).subscribe({
      next: (userDetails) => {
  
        sessionStorage.setItem('userDetails', JSON.stringify(userDetails.data));
        this.isLoading = false;
  
        this.authService.setLoggedInStatus(true);
        this.router.navigate([this.returnUrl]);
      },
      error: (err) => {
  
        this.isLoading = false;
      }
    });
  }

  clear() {
    this.createForm();
  }
}   