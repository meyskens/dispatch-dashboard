import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';
import { AppDetailsService, AppDetails } from '../appdetails.service';

@Component({
  selector: 'dialog-delete-app',
  templateUrl: 'dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css']
})
export class DialogDeleteApp {
  name: string;
  enteredName: string;
  id: string;

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteApp>,
    private router: Router,
    private service: AppDetailsService,
    @Inject(MAT_DIALOG_DATA) public app: AppDetails) {
      this.name = app.name
      this.id = app._id;
    }

  cancel(): void {
    this.dialogRef.close();
  }

  delete() {
    this.service.delete(this.id).subscribe(res => {
      this.router.navigateByUrl('/apps');
    this.dialogRef.close();
    })
  }

  canDelete(): boolean {
    return this.enteredName === this.name;
  }

}