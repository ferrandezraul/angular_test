import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { JornadaJugador } from '../../shared/shared';
import { JugadorService } from './jugador.service';
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.css']
})
export class JugadorComponent implements OnInit {

  displayedColumns: string[] = ['Num', 'Nombre', 'Posicion', 'Equipo'];
  dataSource: MatTableDataSource<JornadaJugador>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  jugador_resultados: JornadaJugador[] = []
  headers_resultados = ['Jornada', 'Marca', 'As', 'Media As y Marca', 'Jugado', 'Ganado', 'Otros', 'Total'];
  headers_sortings = ['resultado.idJornada', 'resultado.puntosMarca', 'resultado.puntosAs', 'puntosCalculados', 'jugado', 'resultadoPartido', 'otros', 'total'];

  constructor(private jugadorService: JugadorService, private route: ActivatedRoute, private _location: Location) {
    this.dataSource = new MatTableDataSource(this.jugador_resultados);
   }
  
  ngOnInit() {
    var jugadorId = this.route.snapshot.paramMap.get('id');
    this.fill(jugadorId);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fill(jugadorId:string){
    this.jugadorService.getResultados(jugadorId).subscribe( (response) => {
      this.jugador_resultados = Object.values<JornadaJugador>(response[jugadorId]);
    });
  }

  backClicked() {
    this._location.back();
  }
}
