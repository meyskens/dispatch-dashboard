import { Injectable } from '@angular/core';
import { API_ENDPOINT } from '../../constants';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApplogsService {

  constructor(private http: HttpClient) { }

  getForAppBetween(appID: string, start: Date, end: Date) {
    return this.http.get(`${API_ENDPOINT}/dash/app/${appID}/app-logs/${start.toISOString()}/${end.toISOString()}`)
  }
}


export class Log {
  constructor() { }
  internalName: string; 
  pod: string;
  container: string;
  line: string;
  time: Date;
}