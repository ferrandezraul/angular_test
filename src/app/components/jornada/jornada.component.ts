import { OnInit } from '@angular/core';
import { Component, Input } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { ResultadoPartido, PuntuacionJugador, Jornada } from 'src/app/shared/shared';

@Component({
  selector: 'app-jornada',
  templateUrl: './jornada.component.html',
  styleUrls: ['./jornada.component.css']
})
export class JornadaComponent implements OnInit {
  @Input() jornada: Jornada;

  nombreJornada: string = "";
  idJornada: number;
  resultados: ResultadoPartido[] = [];
  
  columnsPuntuacionJugador = ['demarcacion', 'nombreJugador', 'resultado.puntosAs', 'resultado.puntosMarca', 'puntosCalculados', 'jugado', 'resultadoPartido', 'otros', 'total', 'goles'];
  columnsPuntuacionJugadorDisplayed = ['demarcacion', 'Jugador', 'As', 'Marca', 'FM', 'Jugado', 'Ganado', 'Otros', ''];

  constructor(private apiService: ApiService ) {}

  ngOnInit(){
    console.log("Jornada es ", this.jornada);
    this.nombreJornada = this.jornada.name;
    this.idJornada = this.jornada.id;

    this.apiService.getResultadosByJornada(this.idJornada.toString()).subscribe((_resultados) => {
      console.log("Resultado ultima jornada terminada es ", _resultados);
      this.resultados = _resultados;
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

  siguienteGol(puntos: number) {
    if (puntos < 28 ) return 28;
    if (puntos < 36 ) return 36;
    if (puntos < 43 ) return 43;
    if (puntos < 49 ) return 49;
    if (puntos < 54 ) return 54;
    if (puntos < 58 ) return 58;
    if (puntos < 61 ) return 61;
    if (puntos < 64 ) return 64;
    if (puntos < 67 ) return 67;

    return puntos + 1;
  }

  getIconPosicion(demarcacion: string) {
    if (demarcacion == 'Portero') return 'sports_handball';
    if (demarcacion == 'Defensa') return 'directions_walk';
    if (demarcacion == 'Medio') return 'directions_run';
    if (demarcacion == 'Delantero') return 'self_improvement';

    return 'accessible_forward';

  }

  toolTipPartido(puntuacion: PuntuacionJugador){
    if( puntuacion.jugado == 0){
      return "Chapeco";
    }
    
    if( puntuacion.resultadoPartido == -1){
      return "Partdo perdido";
    }

    if( puntuacion.resultadoPartido == 1){
      return "Partido ganado";
    }

    return "";
  }

  showIconPorteriaACero(puntuacion: PuntuacionJugador){
    return puntuacion.resultado.golesEncajados == 0 
      && ( puntuacion.demarcacion == 'Defensa' || puntuacion.demarcacion == 'Portero' )
      && !puntuacion.chapeco && puntuacion.estado == "ha-jugado";
  }

}
