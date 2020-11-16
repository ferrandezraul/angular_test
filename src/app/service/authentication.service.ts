import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

export class Token{
  constructor(
    public token:string,
    public idEquipoFb:string,
    public equipoFb:string,
    public equiposFb:string[],
    public equiposLfp:string[]) {}
  
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  apiURL: string = 'http://fantasbeka.ddns.net:8888';

  constructor(private httpClient:HttpClient) {}

    authenticate(username, password) {
      let params = new HttpParams();
      params = params.append('user', username);
      params = params.append('password', password);

      return this.httpClient.get<Token>(`${this.apiURL}/user/login`, {params: params}).pipe(
         map(
           tokenData => {
            sessionStorage.setItem('token', tokenData.token);
            sessionStorage.setItem('idEquipoFb', tokenData.idEquipoFb);
            sessionStorage.setItem('equipoFb', tokenData.equipoFb);
            if (tokenData.equiposFb != null && tokenData.equiposLfp != null) {
              sessionStorage.setItem('equiposFb', tokenData.equiposFb.join());
              sessionStorage.setItem('equiposLfp', tokenData.equiposLfp.join());
            }
            return tokenData;
           }
         )
  
      );
    }
  

  isUserLoggedIn() {
    let token = sessionStorage.getItem('token')
    console.log(!(token === null))
    return !(token === null)
  }

  logOut() {
    sessionStorage.removeItem('token')
  }
}