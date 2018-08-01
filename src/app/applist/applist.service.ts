import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { API_ENDPOINT } from "../../constants"

@Injectable()
export class AppListService {

    constructor(private http: HttpClient) { }

    getAllApps() {
        return this.http.get(API_ENDPOINT + '/dash/apps')
    }

    addApp(app : App) {
        return this.http.post(API_ENDPOINT + "/dash/apps", app)
    }
}

export class App {
    _id: string;
    name: string;
    internalName: string;
    repo: string;
    domain: string;
    replicas: number;
    constructor() { }
} 