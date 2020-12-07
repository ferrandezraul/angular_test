import { Component, OnInit, ChangeDetectorRef, ViewChildren, QueryList } from '@angular/core';
import { PlantillasService } from './plantillas.service';
import { Jugador, Plantilla } from '../shared/shared';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-plantillas',
  templateUrl: './plantillas.component.html',
  styleUrls: ['./plantillas.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PlantillasComponent {
  plantillas2: Plantilla[] = [];
  plantillas = [];
  errorMessage: string;
  demarcaciones = ['Todos', 'Portero', 'Defensa', 'Medio', 'Delantero']
  headers_jugadores = ['Equipo Fantasbeka', 'Demarcación', 'Nombre', 'Equipo', 'Precio'];

  columnsToDisplay = ['nombre', 'creditos', 'jugadores'];
  innerDisplayedColumns = ['nombreJugador', 'demarcacion', 'nombreEquipo', 'price'];
  expandedElement: Plantilla | null;

  displayedColumns: string[] = ['nombre',
                                'creditos',
                                'jugadores'];

  dataSource = new MatTableDataSource<Plantilla>();

  @ViewChildren('innerTables') innerTables: QueryList<MatTable<Jugador>>;
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;

  constructor(private plantillasService: PlantillasService,
    private cd: ChangeDetectorRef ) {
    this.init();
  }

  async init(){
    this.plantillasService.getPlantillasAsync().then((plantillas) => {
      console.log("Plantillas ", plantillas);
      for (const [key, value] of Object.entries(plantillas)) {
        this.plantillas.push({"nombre": key, "jugadores": value["plantilla"], "creditos": value["creditos"]})
      }
    });

    this.plantillasService.getPlantillasAsync().then((data) => {
      console.log("Plantillas ", data);
      for (const [key, value] of Object.entries(data)) {
        this.plantillas2.push( {"nombre": key, "jugadores": new MatTableDataSource(value["plantilla"]), "creditos": value["creditos"]})
      }
      console.log("Plantillas 2 ", this.plantillas2);

      this.dataSource.data = this.plantillas2;
    });
  }

  toggleRow(plantilla: Plantilla) {
    plantilla.jugadores && (plantilla.jugadores as MatTableDataSource<Jugador>).data.length ? (this.expandedElement = this.expandedElement === plantilla ? null : plantilla) : null;
    this.cd.detectChanges();
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<Jugador>).sort = this.innerSort.toArray()[index]);
  }

  applyFilter(filterValue: string) {
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<Jugador>).filter = filterValue.trim().toLowerCase());
  }
}
