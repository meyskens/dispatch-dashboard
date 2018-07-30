import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AuthService } from '../auth/auth.service';

export interface NewAppDialogData {
    name: string;
    repo: string;
    values: {
        domain: string;
        replicas: number;
    };
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
      private authService : AuthService) {
          this.data.values = {
              domain: "",
              replicas: 1,
          }
      }
  
    cancel(): void {
      this.dialogRef.close();
    }

  }