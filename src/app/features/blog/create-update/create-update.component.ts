import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { debug } from 'console';
import { getByIdBlogRequest } from '../../../sharedModule/models/BlogMoels/getByIdBlogRequest';
import { BlogUpdateRequest } from '../../../sharedModule/models/BlogMoels/BlogUpdateRequest';
import { BlogAddRequest } from '../../../sharedModule/models/BlogMoels/BlogAddRequest';
import { BlogService } from '../../../core/services/blog.service';
import { BlogType } from '../../../sharedModule/models/BlogMoels/BlogType';
import { BlogtypeService } from '../../../core/services/blogtype.service';
import { CommonService } from '../../../core/services/common.service';
import { CheckPermissionsService } from '../../../core/services/check-permissions.service';

@Component({
  selector: 'app-create-update',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './create-update.component.html',
  styleUrl: './create-update.component.scss'
})

export class BlogCreateComponent {
  blogTypes: BlogType[] = [];
  formButtonAction: string = 'Create Blog';
  id: number = 0;
  blogForm: FormGroup;
  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  imageBase64: string = '';
  extension: string = '';
  name: string = "";

  constructor(private route: ActivatedRoute
    , private fb: FormBuilder
    , private blogService: BlogService
    , private blogTypeService: BlogtypeService
    , private router: Router
    , private commonService: CommonService
    , private checkPermissionsService: CheckPermissionsService) {
    // this.checkPermissionsService.checkBlogModulePermission();
    
    this.id = Number(this.route.snapshot.paramMap.get("id"));
    if (this.id && this.id !== 0) {
      this.formButtonAction = "Update Blog";
      this.getBlogPost();
    }
    
    this.blogForm = this.fb.group({
      typeId: ['', Validators.required],
      title: ['', Validators.required],
      content: ['', Validators.required],
      image: [''],
      imageName: [''],
      imageExtension: [''],
      removeImage: [null]
    });
    this.imagePreview = '';

    this.getBlogTypes()

  }

  onImageChange1(event: any) {
    
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    let base64 = "";

    reader.onload = () => {
      this.imagePreview = reader.result;
      this.imageBase64 = (reader.result as string).split(',')[1];
      console.log(base64);

    };


  }

  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedImage = input.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(this.selectedImage);
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.imageBase64 = (reader.result as string).split(',')[1];
        this.extension = this.selectedImage?.type.split('/')[1] || '';
        this.name = this.selectedImage?.name || '';

        // Store values in hidden form controls if needed
        this.blogForm.patchValue({
          imageName: this.name,
          imageExtension: this.extension
        });
      };
    }
  }

  onSubmit(): void {
    
    if (this.blogForm.get('type')?.value.length <= 0)
      window.alert("Kindly select the blog type.");

    if (this.blogForm.get('title')?.value.length <= 0)
      window.alert("Kindly enter the title.");

    if (this.blogForm.get('content')?.value.length <= 0)
      window.alert("Kindly enter the content.");

    let pureBase64: string | null = null;

    if (this.blogForm.valid) {

      if (this.id) {
        let updateRequest: BlogUpdateRequest = {
          id: this.id,
          categoryId: this.blogForm.get('typeId')?.value,
          title: this.blogForm.get('title')?.value,
          content: this.blogForm.get('content')?.value,
          image: this.imageBase64,
          imageName: this.name,
          imageExtension: this.extension,
          removeImage: this.blogForm.get('removeImage')?.value
        };

        this.blogService.update(updateRequest).subscribe({
          next: (res) => {
            window.alert(res.message);
            this.router.navigate(['/blogs']);
          },
          error: (error) => {
            window.alert(error.message);
          }
        });
      }
      else {
  
        let addRequest: BlogAddRequest = {
          categoryId: this.blogForm.get('typeId')?.value,
          title: this.blogForm.get('title')?.value,
          content: this.blogForm.get('content')?.value,
          image: this.imageBase64,
          imageName: this.name,
          imageExtension: this.extension,
        };
        this.blogService.Add(addRequest).subscribe({
          next: (res) => {
            window.alert(res.message);
            this.router.navigate(['/blogs']);
          },
          error: (error) => {
            window.alert(error.message);
          }
        });
      }

    } else {
      window.alert('Form is invalid.');
    }
  }

  getBlogPost() {

    let getDateData: getByIdBlogRequest = {
      id: this.id
    };

    this.blogService.getById(getDateData).subscribe({
      next: async (res) => {
        this.blogForm = this.fb.group({
          typeId: [res.data.categoryId],
          title: [res.data.title],
          content: [res.data.content]
        });

        if (res.data.image) {
          this.imagePreview = `data:${res.data.imageExtension};base64,${res.data.image}`;
          this.imageBase64 = res.data.image;
          this.extension = res.data.imageExtension;
          this.name = res.data.imageName;

          this.blogForm.patchValue({
            image: '',
            imageName: '',
            imageExtension: ''
          });
        }
      },
      error: (error) => {
        console.log(error.errors)
      }
    });
  }

  getBlogTypes() {
    this.blogTypeService.getAsync().subscribe({
      next: (res) => {
        this.blogTypes = res.data as BlogType[]
      }
    });
  }

  removeImage(event: Event) {
    
    const checkbox = event.target as HTMLInputElement
    if (event) {
      this.selectedImage = null;
      this.imagePreview = null;
      this.imageBase64 = "";
      this.extension = "";
      this.name = "";

      this.blogForm.patchValue({
        image: '',
        imageName: '',
        imageExtension: ''
      });
    }
  }
}