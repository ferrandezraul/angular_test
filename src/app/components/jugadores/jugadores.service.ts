import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JugadorLFP } from './jugadores-datasource';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class JugadoresService {
  apiURL: string = 'http://fantasbeka.ddns.net:8888';

  constructor(private httpClient: HttpClient) { }

  public getJugadores(): Observable<JugadorLFP[]> {
    return this.httpClient.get<JugadorLFP[]>(`${this.apiURL}/user/jugadores`);
  }
}
