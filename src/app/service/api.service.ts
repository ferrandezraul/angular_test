import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JugadorLFP } from '../shared/shared';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiURL: string = 'http://fantasbeka.ddns.net:8888';

  constructor(private http: HttpClient) { }

  get(url: 'jugadores'): Observable<JugadorLFP[]> {
    let finalUrl = `${this.apiURL}/user/${url}`;

    console.log("Http get request to ", finalUrl);

    return this.http.get<JugadorLFP[]>(finalUrl)
              .pipe(catchError(err => { return this.handleError(err) }));
  }

  private handleError(error: HttpErrorResponse | any): Observable<any>{
    let errMsg: string;

    if (error.error instanceof ErrorEvent) {
      errMsg = error.error.message;
    } else {
      errMsg = `Request to ${error.url} - ${error.status} - ${error.statusText || ''} ${error.error}`;
    }

    return throwError(errMsg);
  }
}
