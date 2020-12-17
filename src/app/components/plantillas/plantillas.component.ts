import { Component, OnInit, ChangeDetectorRef, ViewChildren, QueryList, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Jugador, Plantilla } from '../../shared/shared';
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
export class PlantillasComponent implements AfterViewInit, OnInit {
  plantillas: Plantilla[] = [];
  errorMessage: string;

  columnsToDisplay = ['nombre', 'creditos', 'jugadores'];
  columnsAttributes = ['nombre', 'creditos', 'jugadores'];
  innerColumnsAttributes = ['nombreJugador', 'demarcacion', 'nombreEquipo', 'price'];
  innerColumnsDisplayed = ['Jugador', 'Demarcacion', 'Equipo', 'Precio'];
  expandedElement: Plantilla | null;

  dataSource = new MatTableDataSource<Plantilla>();

  @ViewChild('outerSort') sort: MatSort;
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<Jugador>>;

  constructor(private apiService: ApiService,
              private cd: ChangeDetectorRef ) {
  }

  ngOnInit(){
    this.apiService.getPlantillas().subscribe((data) => {
      console.log("Plantillas ", data);
      for (const [key, value] of Object.entries(data)) {
        this.plantillas.push( {"nombre": key, "jugadores": new MatTableDataSource(value["plantilla"]), "creditos": value["creditos"]})
      }

      this.dataSource.data = this.plantillas;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
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
