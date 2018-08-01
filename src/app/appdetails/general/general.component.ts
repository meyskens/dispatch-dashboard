import { Component, OnInit, Input } from '@angular/core';
import { Update, AppDetails } from '../appdetails.service';

@Component({
  selector: 'app-appdetails-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class AppDetailsGeneralComponent implements OnInit {

  private _updates: Update[];
  private _app: AppDetails;

  constructor() { }

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

}
