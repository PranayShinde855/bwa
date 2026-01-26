import { Component, Inject, input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CheckPermissionsService } from '../../../services/check-permissions.service';

@Component({
  selector: 'app-user-delete',
  imports: [],
  templateUrl: './user-delete.component.html',
  styleUrl: './user-delete.component.scss'
})
export class UserDeleteComponent {
  userId: number = 0;
  constructor(private dialogRef: MatDialogRef<UserDeleteComponent>
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
