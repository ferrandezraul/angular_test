import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Jornada, PartidoLFP, JugadorLFP, Plantilla, ResultadoPartido } from '../shared/shared';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiURL: string = 'https://fantasbeka.ddns.net';

  constructor(private http: HttpClient) { }

  getJugadores(): Observable<JugadorLFP[]> {
    let finalUrl = `${this.apiURL}/user/jugadores`;
    console.log("Http get request to ", finalUrl);

    return this.http.get<JugadorLFP[]>(finalUrl)
              .pipe(catchError(err => { return this.handleError(err) }));
  }

  getPlantillas(): Observable<Plantilla[]> {
    let finalUrl = `${this.apiURL}/user/plantillas`;
    console.log("Http get request to ", finalUrl);

    return this.http.get<Plantilla[]>(finalUrl)
              .pipe(catchError(err => { return this.handleError(err) }));
  }

  getResultadoByJugadorId(id: string): Observable<any> {
    let finalUrl = `${this.apiURL}/user/jugador?jugadorId=${id}`;
    console.log("Http get request to ", finalUrl);

    return this.http.get<any>(finalUrl)
              .pipe(catchError(err => { return this.handleError(err) }));
  }

  getPlantillaFromEquipoFbWithId( id :string): Observable<any> {
    let finalUrl = `${this.apiURL}/user/equipo?equipoId=${id}`;
    console.log("Http get request to ", finalUrl);

    return this.http.get<any>(finalUrl)
              .pipe(catchError(err => { return this.handleError(err) }));
  }

  getPlantillaFromCurrentUser(): Observable<any> {
    let id = localStorage.getItem('idEquipoFb');
    return this.getPlantillaFromEquipoFbWithId(id);
  }

  getAlineacionByJornada(jornada: string): Observable<any> {
    let id = localStorage.getItem('idEquipoFb');
    let finalUrl = `${this.apiURL}/user/alineacion?equipoId=${id}&jornadaId=${jornada}`;
    console.log("Http get request to ", finalUrl);

    return this.http.get<any>(finalUrl)
              .pipe(catchError(err => { return this.handleError(err) }));
  }

  getJornadaAlineable(): Observable<any> {
    let finalUrl = `${this.apiURL}/user/jornadas/alineable`;
    console.log("Http get request to ", finalUrl);

    return this.http.get<any>(finalUrl)
              .pipe(catchError(err => { return this.handleError(err) }));
  }

  getJornadaLFP( jornadaFb: string): Observable<PartidoLFP[]> {
    let finalUrl = `${this.apiURL}/user/partidoslfp?jornadaId=${jornadaFb}`;
    console.log("Http get request to ", finalUrl);

    return this.http.get<any>(finalUrl)
              .pipe(catchError(err => { return this.handleError(err) }));
  }

  getJornadaFB( jornadaFb: string): Observable<PartidoLFP[]> {
    let finalUrl = `${this.apiURL}/user/partidosfb?jornadaId=${jornadaFb}`;
    console.log("Http get request to ", finalUrl);

    return this.http.get<any>(finalUrl)
              .pipe(catchError(err => { return this.handleError(err) }));
  }

  sendAlineacion(alineacion: String[], idJornada: string):  Observable<any>  {
    var body = new Object();
    body["alineacion"] = alineacion;
    body["jornadaId"] = idJornada;
    body["equipoId"] = localStorage.getItem('idEquipoFb');

    let finalUrl = `${this.apiURL}/user/alineacion`;
    console.log("Http post request to ", finalUrl);
    console.log("with body ", body);

    return this.http.post<any>(finalUrl, body);
  }

  getResultadosByJornada(jornadaId: String): Observable<ResultadoPartido[]>{
    let finalUrl = `${this.apiURL}/user/resultados?jornadaId=${jornadaId}`;
    console.log("Http get request to ", finalUrl);

    return this.http.get<any>(finalUrl)
              .pipe(map( response => response["resultado"]), catchError(err => { return this.handleError(err) }));
  }

  getJornadaJugandose(): Observable<Jornada[]> {
    let finalUrl = `${this.apiURL}/user/jornadas/jugandose`;
    console.log("Http get request to ", finalUrl);

    return this.http.get<any>(finalUrl)
              .pipe(catchError(err => { return this.handleError(err) }));
  }

  getJornadasTerminadas(): Observable<Jornada[]> {
    let finalUrl = `${this.apiURL}/user/jornadas/terminada`;
    console.log("Http get request to ", finalUrl);

    return this.http.get<any>(finalUrl)
              .pipe(catchError(err => { return this.handleError(err) }));
  }

  getUltimaJornadaTerminada(): Observable<Jornada> {
    return this.getJornadasTerminadas()
              .pipe( map( jornadas => jornadas[0]), 
                     catchError(err => { return this.handleError(err) }));
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
