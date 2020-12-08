import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PlantillasService {
  apiURL: string = 'http://fantasbeka.ddns.net:8888';

  constructor(private httpClient: HttpClient) { }

  public getPlantillas(){
    return this.httpClient.get(`${this.apiURL}/user/plantillas`);
  }

  async getPlantillasAsync(): Promise<any> {
    //console.log('Id is ')

    let promise = new Promise((resolve, reject) => {
      this.getPlantillas().subscribe((plantillas: any) => {
        resolve(plantillas)
      }); 
    });

    return promise;
  }
}
