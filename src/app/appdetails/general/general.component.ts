import { Component, OnInit, Input } from '@angular/core';
import { Update, AppDetails } from '../appdetails.service';
import { MatDialog } from '@angular/material';
import { DialogScaleApp } from './dialog-scale.component';

@Component({
  selector: 'app-appdetails-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class AppDetailsGeneralComponent implements OnInit {

  private _updates: Update[];
  private _app: AppDetails;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  @Input()
  set app(app: AppDetails) {
    this._app = app;
  }

  @Input()
  set updates(updates: Update[]) {
    this._updates = updates;
  }

  scale(): void {
    const dialogRef = this.dialog.open(DialogScaleApp, {
      width: '350px',
      data: this._app
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this._app.replicas = result
      }
    });
  }

}
