import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {
  apiURL: string = 'http://fantasbeka.ddns.net:8888';

  constructor(private httpClient: HttpClient) { }

  getResultados(id: string): Observable<any> {
    return this.httpClient.get(`${this.apiURL}/user/jugador?jugadorId=${id}`);
  }
}
