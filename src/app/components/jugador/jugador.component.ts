import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { JornadaJugador } from '../../shared/shared';
import { ApiService } from '../../service/api.service';
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.css']
})
export class JugadorComponent implements AfterViewInit, OnInit {

  dataSource = new MatTableDataSource<JornadaJugador>();
  name: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  jugador_resultados: JornadaJugador[] = []
  headers_resultados = ['Jornada', 'Marca', 'As', 'Media As y Marca', 'Jugado', 'Ganado', 'Otros', 'Total'];
  headers_sortings = ['resultado.idJornada', 'resultado.puntosMarca', 'resultado.puntosAs', 'puntosCalculados', 'jugado', 'resultadoPartido', 'otros', 'total'];

  constructor(private apiService: ApiService, 
              private route: ActivatedRoute, 
              private _location: Location) {}
  
  ngOnInit() {
    var jugadorId = this.route.snapshot.paramMap.get('id');

    this.apiService.getResultadoByJugadorId(jugadorId).subscribe( (response) => {
      this.jugador_resultados = Object.values<JornadaJugador>(response[jugadorId]);
      this.dataSource.data = this.jugador_resultados;
      this.name = this.jugador_resultados[0].nombreJugador;
      console.log("Resultados de ", this.name);
      console.log("Resultados jugador", this.jugador_resultados);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  backClicked() {
    this._location.back();
  }
}
