import { Component, OnInit } from '@angular/core';
import { App, AppListService } from '../applist/applist.service';
import { ApplogsService, Log } from './applogs.service';

const ONE_HOUR = 60 * 60 * 1000; /* ms */

@Component({
  selector: 'app-applogs',
  templateUrl: './applogs.component.html',
  styleUrls: ['./applogs.component.css']
})
export class ApplogsComponent implements OnInit {

  private apps: App[];
  private currentApp: App;

  private startDate: Date = new Date(((new Date()).getTime() - ONE_HOUR));
  private endDate: Date = new Date();

  private logs: Log[];

  constructor(private appListService: AppListService, private service: ApplogsService) { }

  ngOnInit() {
    this.appListService.getAllApps().subscribe((res: App[]) => this.apps = res)
  }

  setApp(app: App) {
    this.currentApp = app
    this.getLogs()
  }

  getLogs() {

    /*
      So you like typed languages but don't like TypeScript?

      In the end it is all JavaScript, you can not enforce types. 
      You're trying to get a fake security feeling by your transpiler showing an error,
      That's called a linter, below is an example of how TypeScript fails. it had one job.
      Just give me my ES6 classes, no witchcraft needed.

      </rant>
    */

    this.startDate = new Date(this.startDate)
    this.endDate = new Date(this.endDate)

    this.service.getForAppBetween(this.currentApp._id, this.startDate, this.endDate)
    .subscribe((res: Log[]) => this.logs = res)
  }

}
