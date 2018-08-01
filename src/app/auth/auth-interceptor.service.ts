import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private injector: Injector) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
      ): Observable<HttpEvent<any>> {
        const authService = this.injector.get(AuthService);
        const authRequest: HttpRequest<any> = req.clone({
            // tslint:disable-next-line:max-line-length
            headers: req.headers.set('Authorization', 'Bearer ' + authService.token)
        });
        return next.handle(authRequest).pipe(
          map(event => {
            return event;
          }),
          catchError(error => {
            if (error.status == 419) {
                authService.logout()
            }
            return throwError(error);
          }),
          finalize(() => {
            //this.status.setHttpStatus(false);
          })
        )
    }
}