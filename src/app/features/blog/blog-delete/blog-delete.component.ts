import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CheckPermissionsService } from '../../../services/check-permissions.service';

@Component({
  selector: 'app-blog-delete',
  imports: [],
  templateUrl: './blog-delete.component.html',
  styleUrl: './blog-delete.component.scss'
})
export class BlogDeleteComponent {
  blogId: number = 0;
  constructor(private dialogRef: MatDialogRef<BlogDeleteComponent>
    , @Inject(MAT_DIALOG_DATA) public dialogData: any
    , private checkPermissionsService: CheckPermissionsService) {
    this.checkPermissionsService.checkBlogModulePermission();
    this.blogId = dialogData.blogId;
  }

  onConfirm(): void {
    this.dialogRef.close({ isConfirmed: true, blogId: this.blogId });
  }

  close(): void {
    this.dialogRef.close();
  }
}


