import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-activate-deactivate-user',
  imports: [],
  templateUrl: './activate-deactivate-user.component.html',
  styleUrl: './activate-deactivate-user-component.scss'
})
export class ActivateDeactivateUserComponent {
  data: string = '';

  constructor(private dialogRef: MatDialogRef<ActivateDeactivateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public inputData: any){
      this.data=inputData.dataString
    }

    onConfirm(){
      this.dialogRef.close({isDeactivate: true, isActivate:true});
    }

    onClose(){
      this.dialogRef.close();
    }
}
