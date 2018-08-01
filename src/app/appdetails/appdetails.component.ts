import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrentAppService } from '../navbar/currentapp.service';
import { AppDetailsService, AppDetails, Update } from './appdetails.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-appdetails',
  templateUrl: './appdetails.component.html',
  styleUrls: ['./appdetails.component.css']
})
export class AppDetailsComponent implements OnInit {

  id: string;
  app: AppDetails;
  updates: Update[];

  constructor(private route: ActivatedRoute, private currentAppService: CurrentAppService, private service: AppDetailsService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.load()
   });
  }

  private load() {
    this.service.get(this.id).subscribe(this.handleAppData.bind(this), err => this.snackBar.open('Failed to fetch info', 'Close', { duration: 3000 }))
    this.service.getUpdates(this.id).subscribe(this.handleUpdates.bind(this), err => this.snackBar.open('Failed to fetch updates', 'Close', { duration: 3000 }))
  }

  private handleAppData(app: AppDetails) {
    this.currentAppService.setCurrentApp(app.name);
    this.app = app;
  }
  
  private handleUpdates(updates: Update[]) {
    this.updates = updates
  }

  ngOnDestroy() {
    this.currentAppService.setCurrentApp("");
  }
}
