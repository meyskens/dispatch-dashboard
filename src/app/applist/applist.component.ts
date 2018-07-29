import { Component, OnInit } from '@angular/core';
import { AppListService, App } from './applist.service';
import {MatDialog} from '@angular/material';
import { NewAppDialog } from './newapp.component';

@Component({
  selector: 'app-applist',
  templateUrl: './applist.component.html',
  styleUrls: ['./applist.component.css']
})
export class AppListComponent implements OnInit {

  private apps : App[];

  constructor(private service: AppListService, public dialog: MatDialog) { }

  ngOnInit() {
    this.service.getAllApps().subscribe((res : App[]) => this.apps = res)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewAppDialog, {
      width: '350px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        console.log(result);
      }
    });
  }
}
