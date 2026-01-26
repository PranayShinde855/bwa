import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../services/toaster.service';
import { isPlatformBrowser } from '@angular/common';
//import { switchMap } from 'rxjs';
import { SharedMaterialModule } from '../../../modules/shared-material/shared-material.module';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule
    , SharedMaterialModule
  ],
 // providers: [AuthService],
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
    private toastService: ToastService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
   
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    this.createForm();
    if (isPlatformBrowser(this.platformId)) {
      this.authService.forceLogout();
      localStorage.clear();
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
    if (this.loginForm.invalid) {
      if (!this.f['userName'].value) {
        this.toastService.show('Please enter a valid username');
      } else if (!this.f['password'].value) {
        this.toastService.show('Please enter a valid password');
      }
      return;
    }

    // this.isLoading = true;
    // const loginRequest = this.loginForm.value;
    // this.authService.login(loginRequest).pipe(
    //   switchMap(res => {
    //     debugger
    //     if (!res?.data?.token) {
    //       throw new Error('Token not received');
    //     }
    //     sessionStorage.setItem('token', res.data.token);        
    //     return this.userService.getUserDetails();
    //   })
    // ).subscribe({
    //   next: (userDetails) => {
    //     debugger
    //     sessionStorage.setItem('userDetails', JSON.stringify(userDetails.data));
    //     this.isLoading = false;
    //     debugger
    //     this.authService.setLoggedInStatus(true);
    //     this.router.navigate([this.returnUrl]);
    //   },
    //   error: (err) => {
    //     debugger
    //     this.isLoading = false;
    //     this.toastService.show(err.message || 'Login failed');
    //   }
    // });
  }

  clear() {
    this.createForm();
  }
}   