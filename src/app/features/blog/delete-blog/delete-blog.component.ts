import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CheckPermissionsService } from '../../../core/services/check-permissions.service';

@Component({
  selector: 'app-delete-blog',
  imports: [],
  templateUrl: './delete-blog.component.html',
  styleUrl: './delete-blog.component.scss'
})
export class BlogDeleteComponent {
  blogId: number = 0;
  constructor(private dialogRef: MatDialogRef<BlogDeleteComponent>
    , @Inject(MAT_DIALOG_DATA) public dialogData: any
    , private checkPermissionsService: CheckPermissionsService) {
    // this.checkPermissionsService.checkBlogModulePermission();
    debugger
    this.blogId = dialogData.blogId;
  }

  onConfirm(): void {
    this.dialogRef.close({ isConfirmed: true, blogId: this.blogId });
  }

  close(): void {
    this.dialogRef.close();
  }
}


