import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppDetails } from '../appdetails.service';
import { DatabasesService } from './databases.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-appdetails-databases',
  templateUrl: './databases.component.html',
  styleUrls: ['./databases.component.css']
})
export class AppDetailsDatabasesComponent implements OnInit {

  private _app: AppDetails;

  private mongodb = false;
  private postgresql = false;
  private mariadb = false;
  private redis = false;

  constructor(private service: DatabasesService) { }

  ngOnInit() {
  }

  @Input()
  set app(app: AppDetails) {
    this._app = app;
    this.service.getMongoDB(app._id).subscribe((res: boolean) => this.mongodb = res)
    this.service.getPostgreSQL(app._id).subscribe((res: boolean) => this.postgresql = res)
    this.service.getMariaDB(app._id).subscribe((res: boolean) => this.mariadb = res)
    this.service.getRedis(app._id).subscribe((res: boolean) => this.redis = res)
  }

  @Output() needsReload = new EventEmitter<boolean>();

  toggleMongoDB() {
    this.mongodb = !this.mongodb
    if (this.mongodb) {
      this.service.enableMongoDB(this._app._id).subscribe(res => this.needsReload.emit(true))
    } else {
      this.service.disableMongoDB(this._app._id).subscribe(res => this.needsReload.emit(true))
    }
  }

  togglePostgreSQL() {
    this.postgresql = !this.postgresql
    if (this.postgresql) {
      this.service.enablePostgreSQL(this._app._id).subscribe(res => this.needsReload.emit(true))
    } else {
      this.service.disablePostgreSQL(this._app._id).subscribe(res => this.needsReload.emit(true))
    }
  }

  toggleMariaDB() {
    this.mariadb = !this.mariadb
    if (this.mariadb) {
      this.service.enableMariaDB(this._app._id).subscribe(res => this.needsReload.emit(true))
    } else {
      this.service.disableMariaDB(this._app._id).subscribe(res => this.needsReload.emit(true))
    }
  }

  toggleRedis() {
    this.redis = !this.redis
    if (this.redis) {
      this.service.enableRedis(this._app._id).subscribe(res => this.needsReload.emit(true))
    } else {
      this.service.disableRedis(this._app._id).subscribe(res => this.needsReload.emit(true))
    }
  }

}
