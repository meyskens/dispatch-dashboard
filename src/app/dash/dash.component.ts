import { Component, OnInit } from '@angular/core';
import { StatsService } from './stats.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  private apps = 0;
  private requests = 0;
  private request200s = 0;

  constructor(private stats: StatsService) { }

  ngOnInit() {
    this.stats.getApps().subscribe((res: number) => this.apps = res)
    this.stats.getRequets().subscribe((res: number) => this.requests = res)
    this.stats.get200s().subscribe((res: number) => this.request200s = res)
  }

}
