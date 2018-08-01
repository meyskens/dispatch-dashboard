import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from '../../constants';

@Injectable()
export class AppDetailsService {

  constructor(private http: HttpClient) { }

  get(id: string) {
    return this.http.get(`${API_ENDPOINT}/dash/app/${id}`)
  }

  getUpdates(id: string) {
    return this.http.get(`${API_ENDPOINT}/dash/app/${id}/updates`)
  }

  patch(id: string, patch: object) {
    return this.http.patch(`${API_ENDPOINT}/dash/app/${id}`, patch)
  }

  delete(id: string) {
    return this.http.delete(`${API_ENDPOINT}/dash/app/${id}`,)
  }
}

export class AppDetails {
  constructor() { }

  _id: string;
  name: string;
  replicas: number;
  repo: string;
  domain: string;
  image: string;
}

export class Update {
  tag: string;
  oldTag: string;
  time: Date;
}