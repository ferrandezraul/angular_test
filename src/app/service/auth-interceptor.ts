import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) {}

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

        const token = localStorage.getItem('token')
        var cloned = req;
        if (token) {
            cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + token)
            });
        }

        return next.handle(cloned).pipe( tap(() => {},
          (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 200) {
             return;
            }
            this.router.navigate(['login']);
          }
        }));
    }
}
