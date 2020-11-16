import { Component, OnInit } from '@angular/core';
import { JornadaService } from './jornada.service';

@Component({
  selector: 'app-jornada',
  templateUrl: './jornada.component.html',
  styleUrls: ['./jornada.component.css']
})
export class JornadaComponent {

  nombre_jornada: String = null
  id_jornada: String = null
  resultados = []

  constructor(private jorService: JornadaService) { 
  	this.init();
  }

  async init() {
    this.jorService.getJornadaJugandose().then((response) => {
      this.nombre_jornada = response.name;
      this.id_jornada = response.id;

      // console.log("JORNADA: " + this.id_jornada)

      if (this.id_jornada == null) {
	    this.jorService.getUltimaJornadaTerminada().then((response) => {
	      this.nombre_jornada = response.name;
	      this.id_jornada = response.id;

	      this.jorService.getResultadosAsync(this.id_jornada).then((_resultados) => {
	        this.resultados = _resultados;
	        // console.log(_resultados[0])
	      });
	    });
	  } else {
	    this.jorService.getResultadosAsync(this.id_jornada).then((_resultados) => {
	      this.resultados = _resultados;
	      // console.log(_resultados[0])
	    });
      }
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
