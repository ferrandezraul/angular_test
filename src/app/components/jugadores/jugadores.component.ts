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
  selected_equipo: string = "";
  selected_equipo_lfp: string = "";
  selected_demarcacion: string = "";
  searchCriteria = {};

  optionsSelectedForm: FormGroup;
  
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

    this.setFilter();
  }

  nombreEquiposFantasbeka(){
    let nombre_equipos_fb = sessionStorage.getItem('equiposFb').split(",");
    nombre_equipos_fb.sort();
    nombre_equipos_fb.push('Todos');
    return nombre_equipos_fb;
  }

  nombreEquiposLfP(){
    let nombre_equipos_lfp = sessionStorage.getItem('equiposLfp').split(",");
    nombre_equipos_lfp.sort();
    nombre_equipos_lfp.push('Todos');
    return nombre_equipos_lfp;
  }

  demarcaciones(){
    return ['Todos', 'Portero', 'Defensa', 'Medio', 'Delantero'];
  }

  setFilter() {
    this.dataSource.filterPredicate = ((jugador: JugadorLFP, filter: string) => {
      let searchAttributes = JSON.parse(filter);

      if(searchAttributes["equipo"]){
        if(jugador.equipoFb != searchAttributes["equipo"]){
          return false;
        }
      }

      if(searchAttributes["equipoLfp"]){
        if(jugador.equipoLfp != searchAttributes["equipoLfp"]){
          return false;
        }
      }

      if(searchAttributes["demarcacion"]){
        if(jugador.demarcacion != searchAttributes["demarcacion"]){
          return false;
        }
      }

      return true;
    })
  }

  onEquipoFantasbekaSelected(equipo: string){
    console.log("Selected equipo", equipo);
    this.selected_equipo = equipo;
    this.setActualSearchString();  
    this.dataSource.filter = JSON.stringify(this.searchCriteria);
  }

  onDemarcacionSelected(demarcacion: string){
    console.log("Selected demarcacion", demarcacion);
    this.selected_demarcacion = demarcacion;
    this.setActualSearchString();  
    this.dataSource.filter = JSON.stringify(this.searchCriteria);
  }

  onEquipoLfpSelected(equipo: string){
    console.log("Selected equipo LFP", equipo);
    this.selected_equipo_lfp = equipo;
    this.setActualSearchString(); 
    this.dataSource.filter = JSON.stringify(this.searchCriteria);
  }

  setActualSearchString(){
    this.searchCriteria = {};

    if(this.includeInSearch(this.selected_equipo)){
      this.searchCriteria["equipo"] = this.selected_equipo;
    }

    if(this.includeInSearch(this.selected_demarcacion)){
      this.searchCriteria["demarcacion"] = this.selected_demarcacion;
    }

    if(this.includeInSearch(this.selected_equipo_lfp)){
      this.searchCriteria["equipoLfp"] = this.selected_equipo_lfp;
    }

    console.log("Search criteria is", this.searchCriteria);
  }

  includeInSearch(item:string): boolean {
    return (item != "Todos" );
  }

}
