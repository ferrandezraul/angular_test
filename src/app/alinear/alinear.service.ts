import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Resultado } from '../equipo-fb';
import { Observable } from 'rxjs';
import { AlinearComponent } from './alinear.component';


@Injectable({
  providedIn: 'root'
})
export class AlinearService {
  apiURL: string = 'http://fantasbeka.ddns.net:8888';

  constructor(private httpClient: HttpClient) { }

  public getPlantilla(): Promise<any> {

    var id = sessionStorage.getItem('idEquipoFb')
    let promise = new Promise((resolve, reject) => {
      this.httpClient.get(`${this.apiURL}/user/equipo?equipoId=${id}`)
      .subscribe((response: any[]) => {
        resolve(response);
      });
    });

    return promise;
  }

  public getAlineacion(jornada: string) {
    var id = sessionStorage.getItem('idEquipoFb')
    let promise = new Promise((resolve, reject) => {
      this.httpClient.get(`${this.apiURL}/user/alineacion?equipoId=${id}&jornadaId=${jornada}`)
      .subscribe((response: any[]) => {
        var list: string[] = []
        for (var i = 0; i < response.length; i++) {
          var a = response[i]
          list.push(a["idJugador"])
        }
        resolve(list);
      });
    });
    
    return promise
  }

  public sendAlineacion(alineacion: String[], id_jornada: string, component: AlinearComponent) {
    var body = new Object()
    body["alineacion"] = alineacion
    body["jornadaId"] = id_jornada
    body["equipoId"] = sessionStorage.getItem('idEquipoFb')
    this.httpClient.post<any>(`${this.apiURL}/user/alineacion`, body).subscribe(data => {
      component.open(data["result"], data["error"])
    });
  }

  public getJornadaAlineable(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.httpClient.get(`${this.apiURL}/user/jornadas/alineable`)
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
