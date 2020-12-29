import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token')
    var cloned = req;
    if (token) {
      cloned = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + token)
      });
    }

    return next.handle(cloned).pipe( 
      catchError( (error) => {
        console.log('error is intercept', error);

        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.error("Error Event");
          } else {
            console.log(`error status : ${error.status} ${error.statusText}`);
            switch (error.status) {
              case 401:  // Unauthorized
              case 403:  // Forbidden
                console.log("Redirecting to login");
                this.router.navigate(['login']);
                break;
              default: 
                break;
            }
          } 
        } else {
            console.error("something else happened");
        }

        return throwError(error);
      })
    );
  }
}
