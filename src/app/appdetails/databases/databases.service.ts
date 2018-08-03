import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from '../../../constants';

@Injectable()
export class DatabasesService {

  constructor(private http: HttpClient) { }

  getMongoDB(appid: string) {
    return this.http.get(`${API_ENDPOINT}/dash/app/${appid}/mongodb`)
  }

  enableMongoDB(appid: string) {
    return this.http.post(`${API_ENDPOINT}/dash/app/${appid}/mongodb`, {})
  }

  disableMongoDB(appid: string) {
    return this.http.delete(`${API_ENDPOINT}/dash/app/${appid}/mongodb`)
  }

  getPostgreSQL(appid: string) {
    return this.http.get(`${API_ENDPOINT}/dash/app/${appid}/postgresql`)
  }

  enablePostgreSQL(appid: string) {
    return this.http.post(`${API_ENDPOINT}/dash/app/${appid}/postgresql`, {})
  }

  disablePostgreSQL(appid: string) {
    return this.http.delete(`${API_ENDPOINT}/dash/app/${appid}/postgresql`)
  }

  getMariaDB(appid: string) {
    return this.http.get(`${API_ENDPOINT}/dash/app/${appid}/mariadb`)
  }

  enableMariaDB(appid: string) {
    return this.http.post(`${API_ENDPOINT}/dash/app/${appid}/mariadb`, {})
  }

  disableMariaDB(appid: string) {
    return this.http.delete(`${API_ENDPOINT}/dash/app/${appid}/mariadb`)
  }

  getRedis(appid: string) {
    return this.http.get(`${API_ENDPOINT}/dash/app/${appid}/redis`)
  }

  enableRedis(appid: string) {
    return this.http.post(`${API_ENDPOINT}/dash/app/${appid}/redis`, {})
  }

  disableRedis(appid: string) {
    return this.http.delete(`${API_ENDPOINT}/dash/app/${appid}/redis`)
  }
}
