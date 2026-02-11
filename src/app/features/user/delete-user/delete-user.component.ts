import { Component, Inject, input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CheckPermissionsService } from '../../../core/services/check-permissions.service';

@Component({
  selector: 'app-delete-user',
  imports: [],
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.scss'
})
export class DeleteUserComponent {
  userId: number = 0;
  constructor(private dialogRef: MatDialogRef<DeleteUserComponent>
    , @Inject(MAT_DIALOG_DATA) public inpuData: any
    , private checkPermissionsService: CheckPermissionsService) {
    this.checkPermissionsService.checkUserModulePermission();
    this.userId = inpuData.userId;
  }

  onConfirm() {
    this.dialogRef.close({ isConfirmed: true, id: this.userId });
  }

  close() {
    this.dialogRef.close()
  }
}
