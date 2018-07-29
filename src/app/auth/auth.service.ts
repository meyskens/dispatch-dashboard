import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { API_ENDPOINT } from "../../constants"

@Injectable()
export class AuthService {

    TOKEN_KEY = 'token';
    USER_KEY = 'token';

    constructor(private http: HttpClient, private router: Router) { }

    get token() {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    get isAuthenticated() {
        return !!localStorage.getItem(this.TOKEN_KEY);
    }

    get user() {
        return <User>JSON.parse(localStorage.getItem(this.USER_KEY))
    }

    logout() {
        localStorage.removeItem(this.TOKEN_KEY);
        this.router.navigateByUrl('/login');
    }

    login(email: string, pass: string) {
        const headers = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' })
        };

        const data = {
            email: email,
            password: pass
        };

        const req = this.http.post(API_ENDPOINT + '/authenticate', data, headers)
        
        req.subscribe(
            (res: any) => {
                localStorage.setItem(this.TOKEN_KEY, res.token);
                this.router.navigateByUrl('/dash');
                this.storeUserInfo()
            }
        )

        return req.toPromise()
    }

    storeUserInfo() {
        return this.http.get(API_ENDPOINT + '/dash/me').subscribe((res : User) => localStorage.setItem(this.USER_KEY, JSON.stringify(res)))
    }
}


export class User {
    name: string;
    repoUser: string;
    email: string;
    constructor() { }
}