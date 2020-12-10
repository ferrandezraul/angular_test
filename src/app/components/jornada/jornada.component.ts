import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-jornada',
  templateUrl: './jornada.component.html',
  styleUrls: ['./jornada.component.css']
})
export class JornadaComponent {

  nombre_jornada: String = null
  id_jornada: String = null
  resultados = []

  constructor(private apiService: ApiService ) { 
  	this.init();
  }

  async init() {
    this.apiService.getJornadaJugandose().subscribe((response) => {
      if (response.length == 0) {
        this.apiService.getUltimaJornadaTerminada().subscribe((response) => {
          this.nombre_jornada = response.name;
          this.id_jornada = response.id;
  
          this.apiService.getResultadosByJornada(this.id_jornada).subscribe((_resultados) => {
            this.resultados = _resultados["resultado"];
          });
        });

        return;
      }

      this.nombre_jornada = response[0].name;
      this.id_jornada = response[0].id;
	    
	    this.apiService.getResultadosByJornada(this.id_jornada).subscribe((_resultados) => {
	      this.resultados = _resultados["resultado"];
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
