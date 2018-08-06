import { Injectable } from '@angular/core';
import { API_ENDPOINT } from '../../constants';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StatsService {

  constructor(private http: HttpClient) { }

  getApps() {
    return this.http.get(`${API_ENDPOINT}/dash/stats/app-count`)
  }

  getRequets() {
    return this.http.get(`${API_ENDPOINT}/dash/stats/app-request-count`)
  }

  get200s() {
    return this.http.get(`${API_ENDPOINT}/dash/stats/app-200-count`)
  }
}
