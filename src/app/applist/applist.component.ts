import { Component, OnInit } from '@angular/core';
import { AppListService, App } from './applist.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NewAppDialog } from './newapp.component';

@Component({
  selector: 'app-applist',
  templateUrl: './applist.component.html',
  styleUrls: ['./applist.component.css']
})
export class AppListComponent implements OnInit {

  private apps: App[];
  private appsLoading = false;

  constructor(private service: AppListService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.appsLoading = true
    this.service.getAllApps().subscribe((res: App[]) => {
      this.apps = res
      this.appsLoading = false
    })
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
        this.service.addApp(result).subscribe(
          (res: App) => {
            this.snackBar.open('App created', 'Close', { duration: 3000 })
            this.apps.push(res)
          },
          err => this.snackBar.open('App creation failed', 'Close', { duration: 3000 }))
      }
    });
  }
}
