import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';
import { AppDetailsService, AppDetails } from '../appdetails.service';

@Component({
  selector: 'dialog-scale-app',
  templateUrl: 'dialog-scale.component.html',
  styleUrls: ['./dialog-scale.component.css']
})
export class DialogScaleApp {
  replicas: number;
  id: string;

  constructor(
    public dialogRef: MatDialogRef<DialogScaleApp>,
    private service: AppDetailsService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public app: AppDetails) {
      this.replicas = app.replicas
      this.id = app._id;
    }

  cancel(): void {
    this.dialogRef.close();
  }

  scale() {
    this.service.patch(this.id, {
      replicas: this.replicas,
    }).subscribe(res => {
      this.snackBar.open('App has scaled', 'Close', { duration: 3000 })
      this.dialogRef.close(this.replicas);
    }, err => this.snackBar.open('Failed to scale', 'Close', { duration: 3000 }))
    
  }

}