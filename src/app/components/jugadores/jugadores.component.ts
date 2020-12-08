import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { JugadorLFP, JugadorLFPDataSource } from './jugadores-datasource';
import { JugadoresService } from './jugadores.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-plantillas',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css'],
})
export class JugadoresComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['num', 'nombre', 'demarcacion', 'equipoLfp', 'equipoFb', 'precio', 'puntosJugados', 'puntosGanados', 'puntosMarca', 'puntosAs', 'puntosCalculados', 'puntosOtros', 'puntosTotal'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<JugadorLFP>();

  constructor(private jugService: JugadoresService) {}
  
  ngOnInit(){
    this.jugService.getJugadores().subscribe((jugadores) => {
      this.dataSource.data = jugadores;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
