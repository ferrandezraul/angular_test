import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPage } from '../interfaces/info-page.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPageService {

  info: InfoPage = {};
  loaded = false;


  constructor( private http: HttpClient ) { 
    console.log("Servicio infoPage ready");

    // Read json file
    this.http.get( 'assets/data/data-page.json').subscribe(
      (resp: InfoPage) => { 
        console.log(resp);
        this.info = resp;
        this.loaded = true; 
      }
    )
  }
}
