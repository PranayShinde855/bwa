import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordValidator } from '../../../sharedModule/validators/password.validator';
import { UserService } from '../../../core/services/user.service';
import { SharedMaterialModule } from '../../../sharedModule/shared-material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule
    , SharedMaterialModule
    , MatFormFieldModule
    , MatInputModule
    , MatIconModule
    , MatButtonModule

  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  hasMinLength: boolean = false;
  hasMaxLength: boolean = false;
  hasUpper: boolean = false;
  hasLower: boolean = false;
  hasNumber: boolean = false;
  hasSpecial: boolean = false;
  showOldPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;
  constructor(private fb: FormBuilder
    , private userService: UserService
    , private router: Router
  ) {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, passwordValidator()]],
      confirmPassword: ['', [Validators.required, passwordValidator()]]
    });
  }

  initialize() {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, passwordValidator()]],
      confirmPassword: ['', [Validators.required, passwordValidator()]]
    });
  }

  submit() {
    let changePasswordRequest = {
      "oldPassword": this.changePasswordForm.value['oldPassword'],
      "newPassword": this.changePasswordForm.value['newPassword'],
      "confirmPassword": this.changePasswordForm.value['confirmPassword'],
    };


    if (changePasswordRequest.oldPassword == changePasswordRequest.newPassword) {
      window.alert("Old password cannot be new password.")
    }
    else {
      this.userService.changePassword(changePasswordRequest).subscribe({
        next: (res) => {
          window.alert(res.message)
          this.initialize();
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {

          window.alert(err.message)
        }
      }
      );
    }

  }

  isPasswordValid(event: Event) {
    const pwd = (event.target as HTMLInputElement).value;
    this.hasMinLength = pwd.length >= 8;
    this.hasMaxLength = (pwd.length <= 14) && (pwd.length > 0);
    this.hasUpper = /[A-Z]/.test(pwd);
    this.hasLower = /[a-z]/.test(pwd);
    this.hasNumber = /\d/.test(pwd);
    this.hasSpecial = /[@$!%*?&]/.test(pwd);
  }



}
