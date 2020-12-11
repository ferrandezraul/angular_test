import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { ResultadoPartido } from 'src/app/shared/shared';

@Component({
  selector: 'app-jornada',
  templateUrl: './jornada.component.html',
  styleUrls: ['./jornada.component.css']
})
export class JornadaComponent {

  nombreJornada: String;
  idJornada: number;
  resultados: ResultadoPartido[] = [];

  constructor(private apiService: ApiService ) { 
  	this.init();
  }

  async init() {
    this.apiService.getJornadaJugandose().subscribe((jornadaJugandose) => {
      if (jornadaJugandose.length == 0) {
        this.apiService.getUltimaJornadaTerminada().subscribe((jornadaTerminada) => {
          this.nombreJornada = jornadaTerminada.name;
          this.idJornada = jornadaTerminada.id;
  
          this.apiService.getResultadosByJornada(this.idJornada.toString()).subscribe((_resultados) => {
            console.log("Resultado ultima jornada terminada es ", _resultados);
            this.resultados = _resultados;
          });
        });

        return;
      }

      this.nombreJornada = jornadaJugandose[0].name;
      this.idJornada = jornadaJugandose[0].id;
	    
	    this.apiService.getResultadosByJornada(this.idJornada.toString()).subscribe((_resultados) => {
        console.log("Resultado jornada jugandose es ", _resultados);
	      this.resultados = _resultados;
	    });

    });
  }

  enfarloparJugador(jugador: String) {
    let resultado = jugador;
    switch (jugador) { 
       case "William Carvalho": { resultado = "William Calvario"; break; } 
       case "Yassine Bono": { resultado = "Bono el de U2"; break; }
       case "Domingos Duarte": { resultado = "Domingas Duarte"; break; }
       case "Felipe": { resultado = "Felipe VI"; break; }
       case "Fidel Chaves": { resultado = "Fidel Castro"; break; } 
       default: { break; } 
    }
    return resultado;
  }
}
