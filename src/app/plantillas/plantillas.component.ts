import { Component, OnInit } from '@angular/core';
import { PlantillasService } from './plantillas.service';


@Component({
  selector: 'app-plantillas',
  templateUrl: './plantillas.component.html',
  styleUrls: ['./plantillas.component.css'],
})
export class PlantillasComponent {
  plantillas = []
  demarcaciones = ['Todos', 'Portero', 'Defensa', 'Medio', 'Delantero']
  headers_jugadores = ['Equipo Fantasbeka', 'Demarcación', 'Nombre', 'Equipo', 'Precio'];

  constructor(private plantillasService: PlantillasService) {
    this.init();
  }

  async init(){
    this.plantillasService.getPlantillasAsync().then((plantillas) => {
      for (const [key, value] of Object.entries(plantillas)) {
        this.plantillas.push({"nombre": key, "jugadores": value["plantilla"], "creditos": value["creditos"]})
      }
    });
  }
}
