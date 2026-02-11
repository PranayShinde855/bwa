import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { addUserRequest } from '../../../sharedModule/models/UserModels/addUserRequest';
import { UserService } from '../../../core/services/user.service';
import { getByIdUserRequest } from '../../../sharedModule/models/UserModels/getByIdUserRequest';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { updateUserRequet } from '../../../sharedModule/models/UserModels/updateUserRequest';
import { GetRoles } from '../../../sharedModule/models/UserModels/GetRoles';
import { GetIsdCodes } from '../../../sharedModule/models/UserModels/GetISDCode';
import { Router } from '@angular/router';
import { CheckPermissionsService } from '../../../core/services/check-permissions.service';
@Component({
  selector: 'app-create-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './create-update.component.html',
  styleUrl: './create-update.component.scss'
})

export class CreateUpdateComponent {
  id: number = 0;
  roles: GetRoles[] = [];
  isdCodes: GetIsdCodes[] = [];
  selectedIsdCode: string = '';
  selectedRoleId: number = 0;
  imagePreview: string | ArrayBuffer | null = null;
  userForm: FormGroup;
  imageBase64: string = '';
  salutations = ['Mr', 'Mrs', 'Ms', 'Other'];

  constructor(private route: ActivatedRoute
    , private fb: FormBuilder
    , private userService: UserService
    , private router: Router
    , private checkPermissionsService: CheckPermissionsService
  ) {
    this.checkPermissionsService.checkUserModulePermission();
    this.userForm = this.fb.group({
      id: ['', [Validators.required, Validators.min(0)]],
      roleId: ['', [Validators.required, Validators.min(0)]],
      salutation: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      isdCode: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      // Hidden fields for file data
      image: [''],
      imageName: [''],
      imageExtension: [''],
      removeImage: [false]
    });
    this.imagePreview = '';

    this.getIsdCodes();
    this.getRoles();

    this.id = Number(this.route.snapshot.paramMap.get("id"));
    if (this.id > 0) {
      this.getById(this.id);
    }

  }

  initializeForm() {
    this.userForm = this.fb.group({
      roleId: [null, [Validators.required, Validators.min(0)]],
      salutation: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      isdCode: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      // Hidden fields for file data
      image: [''],
      imageName: [''],
      imageExtension: [''],
      removeImage: [false]
    });
    this.imagePreview = '';
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      this.imagePreview = reader.result; // for preview

      const base64 = (reader.result as string).split(',')[1];

      this.userForm.patchValue({
        image: base64,
        imageName: file.name,
        imageExtension: file.type
      });
    };
  }

  // Handle file selection
  onFileChange(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const fileNameParts = file.name.split('.');
      const extension = fileNameParts.pop() || '';
      const name = fileNameParts.join('.');

      this.userForm.patchValue({
        imageName: name,
        imageExtension: extension,
      });
      event.target.value = null;
    }
  }

  // Handle form submission
  onSubmit(): void {

    if (this.id <= 0) {
      let userRequest: addUserRequest = {
        salutation: this.userForm.get('salutation')?.value,
        firstName: this.userForm.get('firstName')?.value,
        lastName: this.userForm.get('lastName')?.value,
        email: this.userForm.get('email')?.value,
        image: this.userForm.get('image')?.value,
        imageName: this.userForm.get('imageName')?.value,
        imageExtension: this.userForm.get('imageExtension')?.value,
        isdCode: this.userForm.get('isdCode')?.value,
        mobileNumber: this.userForm.get('mobileNumber')?.value,
        roleId: this.userForm.get('roleId')?.value,
      }

      this.userService.Add(userRequest).subscribe({
        next: (res) => {
          window.alert(res.message);
          this.router.navigate(['/users']);
        },
        error: (res) => {
          window.alert(res.errors);
        }
      });
    }
    else {
      let userRequest: updateUserRequet = {
        id: this.id,
        salutation: this.userForm.get('salutation')?.value,
        firstName: this.userForm.get('firstName')?.value,
        lastName: this.userForm.get('lastName')?.value,
        email: this.userForm.get('email')?.value,
        image: this.userForm.get('image')?.value,
        imageName: this.userForm.get('imageName')?.value,
        imageExtension: this.userForm.get('imageExtension')?.value,
        isdCode: this.userForm.get('isdCode')?.value,
        mobileNumber: this.userForm.get('mobileNumber')?.value,
        roleId: this.userForm.get('roleId')?.value,
        removeImage: this.userForm.get('removeImage')?.value
      }

      this.userService.update(userRequest).subscribe({
        next: (res) => {
          window.alert(res.message);
          this.router.navigate(['/users']);
        },
        error: (res) => {
          window.alert(res.errors);
        }
      });
    }
  }

  getById(id: number) {
    if (id <= 0)
      window.alert('Kindly select user.');

    let getUserequest: getByIdUserRequest = {
      id: id
    };
    this.userService.getById(getUserequest).subscribe({
      next: (res) => {
        this.userForm = this.fb.group({
          roleId: res.data.roleId,
          salutation: res.data.salutation,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
          isdCode: res.data.isdCode,
          mobileNumber: res.data.mobileNumber,
          image: res.data.image,
          imageName: res.data.imageName,
          imageExtension: res.data.imageExtension,
          removeImage: false
        });
  
        this.selectedRoleId = res.data.roleId;
        this.selectedIsdCode = res.data.isdCode;

        if (res.data.image && res.data.image.length > 0) {
          this.imagePreview = `data:${res.data.imageExtension};base64,${res.data.image}`;
          this.imageBase64 = `data:${res.data.imageExtension};base64,${res.data.image}`;
        }
      }
    })
  }

  onReset() {
    this.initializeForm();
  }

  getRoles() {
    this.userService.getRoles().subscribe({
      next: (res) => {
        this.roles = res.data as GetRoles[]
      }
    });
  }

  getIsdCodes() {
    this.userService.getISDCodes().subscribe({
      next: (res) => {
        this.isdCodes = res.data as GetIsdCodes[]
      }
    });
  }

  removeImage(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (event) {
      this.userForm.patchValue({
        image: '',
        imageName: '',
        imageExtension: '',
        removeImage: true
      });
    }
  }
}