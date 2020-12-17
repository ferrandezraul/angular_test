import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { JugadorLFP } from '../../shared/shared';
import { ApiService } from '../../service/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-plantillas',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css'],
})
export class JugadoresComponent implements AfterViewInit, OnInit {
  nombre_equipos_fb: string[] = [];
  nombre_equipos_lfp: string[] = [];

  selected_equipo: String = String();
  selected_equipo_lfp: String = String();
  selected_demarcacion: String = String();

  optionsSelectedForm: FormGroup;

  readonly demarcaciones = ['Todos', 'Portero', 'Defensa', 'Medio', 'Delantero']
  
  displayedColumns: string[] = ['num', 'nombre', 'demarcacion', 'equipoLfp', 'equipoFb', 'precio', 'puntosJugados', 'puntosGanados', 'puntosMarca', 'puntosAs', 'puntosCalculados', 'puntosOtros', 'puntosTotal'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<JugadorLFP>();

  constructor(private apiService: ApiService,
              private formBuilder: FormBuilder ) {}
  
  ngOnInit(){
    this.apiService.getJugadores().subscribe((jugadores) => {
      this.dataSource.data = jugadores;
    });

    this.createFormFilters();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  createFormFilters() {
    this.optionsSelectedForm = this.formBuilder.group({
      equipoSelected: ['Todos', Validators.required],
      demarcacionSelected: ['Todos', Validators.required],
      equipoLfpSelected: ['Todos', Validators.required]
    });

    this.nombre_equipos_fb = sessionStorage.getItem('equiposFb').split(",");
    this.nombre_equipos_fb.sort();
    this.nombre_equipos_fb.push('Todos');
    
    this.nombre_equipos_lfp = sessionStorage.getItem('equiposLfp').split(",");
    this.nombre_equipos_lfp.sort();
    this.nombre_equipos_lfp.push('Todos');

    this.selected_equipo = "Todos";
    this.selected_equipo_lfp = "Todos";
    this.selected_demarcacion = "Todos";
  }

  onEquipoFantasbekaSelected(equipo: string){
    this.selected_equipo = equipo;
    console.log("Selected equipo", equipo);
    // TODO Apply filter
  }

  onDemarcacionSelected(demarcacion: string){
    this.selected_demarcacion = demarcacion;
    console.log("Selected demarcacion", demarcacion);
    // TODO Apply filter
  }

  onEquipoLfpSelected(equipo: string){
    this.selected_equipo_lfp = equipo;
    console.log("Selected equipo LFP", equipo);
    // TODO Apply filter
  }

}
