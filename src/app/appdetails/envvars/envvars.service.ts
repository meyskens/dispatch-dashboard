import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from '../../../constants';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class EnvVarsService {

  constructor(private http: HttpClient) { }

  getEnvVar(appid: string) {
    return this.http.get(`${API_ENDPOINT}/dash/app/${appid}/envvars`)
  }

  addEnvVar(appid: string, envVar: EnvVar) {
    return this.http.post(`${API_ENDPOINT}/dash/app/${appid}/envvar`, envVar)
  }

  editEnvVar(appid: string, envVar: EnvVar) {
    return this.http.patch(`${API_ENDPOINT}/dash/app/${appid}/envvar/${envVar._id}`, envVar)
  }

  deleteEnvVar(appid: string, envVar: EnvVar) {
    return this.http.delete(`${API_ENDPOINT}/dash/app/${appid}/envvar/${envVar._id}`)
  }
}

export class EnvVar {
  _id: string;
  name: string;
  key: string;
  value: string;
  hide: boolean;
  constructor() { }
}