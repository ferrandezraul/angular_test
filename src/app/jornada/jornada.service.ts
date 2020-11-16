import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class JornadaService {
  apiURL: string = 'http://fantasbeka.ddns.net:8888';

  constructor(private httpClient: HttpClient) { }

  public getResultados(jornadaId: String){
    return this.httpClient.get(`${this.apiURL}/user/resultados?jornadaId=${jornadaId}`);
  }

  async getResultadosAsync(jornadaId: String): Promise<any> {

    let promise = new Promise((resolve, reject) => {
      this.getResultados(jornadaId).subscribe((resultados: any) => {
        resolve(resultados["resultado"]);
      });
    });

    return promise;
  }

  public getJornadaJugandose(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.httpClient.get(`${this.apiURL}/user/jornadas/jugandose`)
      .subscribe((response: any[]) => {
        var jornada = {}
        if (response.length > 0) {
          jornada["id"] = response[0]["id"]
          jornada["name"] = response[0]["name"]
        }
        resolve(jornada);
      });
    });

    return promise;
  }

  public getUltimaJornadaTerminada(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.httpClient.get(`${this.apiURL}/user/jornadas/terminada`)
      .subscribe((response: any[]) => {
        var jornada = {}
        if (response.length > 0) {
          jornada["id"] = response[0]["id"]
          jornada["name"] = response[0]["name"]
        }
        resolve(jornada);
      });
    });

    return promise;
  }

}
