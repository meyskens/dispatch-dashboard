import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppDetails, AppDetailsService } from '../appdetails.service';
import { DialogAddDomain } from './dialog-add.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { App } from '../../applist/applist.service';
import pull from "lodash.pull"

@Component({
  selector: 'app-appdetails-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.css']
})
export class AppDetailsDomainsComponent implements OnInit {

  private _app: AppDetails;

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, private service: AppDetailsService) { }

  ngOnInit() {
  }

  @Input()
  set app(app: AppDetails) {
    this._app = app;
  }

  @Output() needsReload = new EventEmitter<boolean>();

  add() {
    const dialogRef = this.dialog.open(DialogAddDomain, {
      width: '350px',
      data: ""
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        console.log(result);
        this._app.altDomains.push(result)
        this.service.patch(this._app._id, { altDomains: this._app.altDomains }).subscribe(
          (res: App) => {
            this.snackBar.open('Domain added', 'Close', { duration: 3000 })
            this.needsReload.emit(true)
          },
          err => this.snackBar.open('Adding domain failed', 'Close', { duration: 3000 }))
      }
    });
  }

  delete(domain: string) {
    pull(this._app.altDomains, domain)
    this.service.patch(this._app._id, { altDomains: this._app.altDomains }).subscribe(
      (res: App) => {
        this.snackBar.open('Domain removed', 'Close', { duration: 3000 })
        this.needsReload.emit(true)
      },
      err => this.snackBar.open('Removing domain failed', 'Close', { duration: 3000 }))
  }

}
