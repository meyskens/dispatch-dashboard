import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AuthService } from '../auth/auth.service';

export interface NewAppDialogData {
    name: string;
    repo: string;
  }

@Component({
    selector: 'newapp-dialog',
    templateUrl: 'newapp-dialog.html',
    styleUrls: ['./newapp-dialog.component.css']
  })
  export class NewAppDialog {
  
    constructor(
      public dialogRef: MatDialogRef<NewAppDialog>,
      @Inject(MAT_DIALOG_DATA) public data: NewAppDialogData,
      private authService : AuthService) {}
  
    cancel(): void {
      this.dialogRef.close();
    }

  }