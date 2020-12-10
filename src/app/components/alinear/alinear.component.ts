import { Component, OnInit } from '@angular/core';
import { JornadaService } from '../jornada/jornada.service';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-plantillas',
  templateUrl: './alinear.component.html',
  styleUrls: ['./alinear.component.css'],
})
export class AlinearComponent {
    modal_resultado = ""
    content: Object = null
    nombre_jornada = ""
    id_jornada = "0"
    plantilla = {}
    nombres_jugadores = []
    selected_jugador: String[] = []

  constructor(private apiService: ApiService,
              private jorService: JornadaService) { 
    for(var i =1; i <= 12; i++) {
      this.selected_jugador.push("Jugador " + i)
    }
    this.init()
  }

  async init() {
    //{"id":"1", "name":"jornada 1"}
    this.apiService.getJornadaAlineable().subscribe((response) => {
      this.nombre_jornada = response.name
      this.id_jornada = response.id

      if (this.id_jornada != null) {
        this.apiService.getPlantillaFromCurrentUser().subscribe((response: any[]) => {
          for (var i = 0; i < response.length; i++) {
            var j = response[i]
            this.plantilla[j["id"]] = j["nombreJugador"]
            this.nombres_jugadores.push(j["nombreJugador"])
          }

          this.apiService.getAlineacionByJornada(this.id_jornada).subscribe((ultima_alineacion: any[]) => {
            if (ultima_alineacion.length == 12) {
              this.cargarAlineacion(ultima_alineacion)
            } else {
              this.jorService.getUltimaJornadaTerminada().then((response) => {
                this.apiService.getAlineacionByJornada(response.id).subscribe((ultima_alineacion_ter: any[]) => {
                    this.cargarAlineacion(ultima_alineacion_ter)
                });
              });
            }
          });
        });
      } else {
        this.nombre_jornada = "NO HAY JORNADA ALINEABLE"
      }
    });
  }

  enviar_alineacion(_content) {
    this.content = _content
    var alineacion: String[] = []
    for(var i =0; i < 12; i++) {
      alineacion.push(this.getIdJugadorByValue(this.selected_jugador[i]))
    }
    this.apiService.sendAlineacion(alineacion, this.id_jornada);
  }

  select_jugador(jugador: string, i: number) {
    this.selected_jugador[i] = jugador;
  }

  private getIdJugadorByValue(searchValue: String) {
    for (let [key, value] of Object.entries(this.plantilla)) {
      if (value === searchValue)
        return key;
    }
  }

  private cargarAlineacion(alineacion: number[]) {
    if (alineacion.length == 12) {
      for(var i =0; i < 12; i++) {
        this.selected_jugador[i] = this.plantilla[alineacion[i]];
      }
    }    
  }
}
