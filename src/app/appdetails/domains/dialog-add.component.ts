import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'dialog-add=domain',
  templateUrl: 'dialog-add.component.html',
  styleUrls: ['./dialog-add.component.css']
})
export class DialogAddDomain {
  domain: string;

  constructor(
    public dialogRef: MatDialogRef<DialogAddDomain>,
    @Inject(MAT_DIALOG_DATA) public input: string) {
      this.domain = input
    }

  cancel(): void {
    this.dialogRef.close();
  }

}