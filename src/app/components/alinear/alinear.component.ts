import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-plantillas',
  templateUrl: './alinear.component.html',
  styleUrls: ['./alinear.component.css'],
})
export class AlinearComponent {
    modal_resultado = ""
    content: Object = null
    nombreJornada = ""
    idJornada = "0"
    plantilla = {}
    nombres_jugadores = []
    selected_jugador: String[] = []

  constructor(private apiService: ApiService) { 
    for(var i =1; i <= 12; i++) {
      this.selected_jugador.push("Jugador " + i)
    }
    this.init()
  }

  async init() {
    //{"id":"1", "name":"jornada 1"}
    this.apiService.getJornadaAlineable().subscribe((response) => {
      this.nombreJornada = response[0].name
      this.idJornada = response[0].id

      if (this.idJornada == null) {
        this.nombreJornada = "NO HAY JORNADA ALINEABLE";
        return;
      }

      this.apiService.getPlantillaFromCurrentUser().subscribe((response: any[]) => {
        for (var i = 0; i < response.length; i++) {
          var j = response[i]
          this.plantilla[j["id"]] = j["nombreJugador"]
          this.nombres_jugadores.push(j["nombreJugador"])
        }

        this.apiService.getAlineacionByJornada(this.idJornada).subscribe((ultima_alineacion: any[]) => {
          if (ultima_alineacion.length == 12) {
            this.cargarAlineacion(ultima_alineacion)
          } else {
            this.apiService.getUltimaJornadaTerminada().subscribe((response) => {
              this.apiService.getAlineacionByJornada(response.id).subscribe((ultima_alineacion_ter: any[]) => {
                  this.cargarAlineacion(ultima_alineacion_ter)
              });
            });
          }
        });
      });

    });
  }

  enviar_alineacion(_content) {
    this.content = _content
    var alineacion: String[] = []
    for(var i =0; i < 12; i++) {
      alineacion.push(this.getIdJugadorByValue(this.selected_jugador[i]))
    }
    this.apiService.sendAlineacion(alineacion, this.idJornada);
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
