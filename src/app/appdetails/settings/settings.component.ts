import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppDetails, AppDetailsService } from '../appdetails.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DialogDeleteApp } from './dialog-delete.component';

@Component({
  selector: 'app-appdetails-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class AppDetailsSettingsComponent implements OnInit {

  private _app: AppDetails;

  constructor(private snackBar: MatSnackBar, private service: AppDetailsService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  @Input()
  set app(app: AppDetails) {
    this._app = app;
  }

  @Output() needsReload = new EventEmitter<boolean>();

  save() {
    console.log(this._app)
    this.service.patch(this._app._id, {
      name: this._app.name,
      repo: this._app.repo,
      domain: this._app.domain,
    }).subscribe(res => {
      this.snackBar.open('Saved app', 'Close', { duration: 3000 })
      this.needsReload.emit(true)
    }, err => this.snackBar.open('Failed to save', 'Close', { duration: 3000 }))
  }

  delete() {
    const dialogRef = this.dialog.open(DialogDeleteApp, {
      width: '350px',
      data: this._app
    });

    dialogRef.afterClosed()
  }

}
