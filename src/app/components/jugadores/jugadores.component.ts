import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { JugadorLFP } from '../../shared/shared';
import { ApiService } from '../../service/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-plantillas',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css'],
})
export class JugadoresComponent implements AfterViewInit, OnInit {
  disableTooltip: boolean = false;
  selected_equipo: string;
  selected_equipo_lfp: string;
  selected_demarcacion: string;
  filterCriteria = {};

  optionsSelectedForm: FormGroup;
  
  displayedColumns: string[] = ['num', 'nombre', 'demarcacion', 'equipoLfp', 'equipoFb', 'precio', 'puntosJugados', 'puntosGanados', 'puntosMarca', 'puntosAs', 'puntosCalculados', 'puntosOtros', 'puntosTotal'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<JugadorLFP>();

  constructor(private apiService: ApiService,
              private formBuilder: FormBuilder,
              private media: MediaObserver ) {}
  
  ngOnInit(){
    this.disableTooltip = this.media.isActive("xs");

    this.apiService.getJugadores().subscribe((jugadores) => {
      this.dataSource.data = jugadores;
    });

    this.createFormFilters();
    this.dataSource.filterPredicate = this.customFilter();
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
  }

  nombreEquiposFantasbeka(): string[]{
    let nombre_equipos_fb = localStorage.getItem('equiposFb').split(",");
    nombre_equipos_fb.sort();
    nombre_equipos_fb.push('Todos');
    return nombre_equipos_fb;
  }

  nombreEquiposLfP(): string[] {
    let nombre_equipos_lfp = localStorage.getItem('equiposLfp').split(",");
    nombre_equipos_lfp.sort();
    nombre_equipos_lfp.push('Todos');
    return nombre_equipos_lfp;
  }

  demarcaciones(): string[]{
    return ['Todos', 'Portero', 'Defensa', 'Medio', 'Delantero'];
  }

  onEquipoFantasbekaSelected(equipo: string){
    console.log("Selected equipo", equipo);
    this.selected_equipo = equipo;
    this.setActualSearchString();  
    this.dataSource.filter = JSON.stringify(this.filterCriteria);
  }

  onDemarcacionSelected(demarcacion: string){
    console.log("Selected demarcacion", demarcacion);
    this.selected_demarcacion = demarcacion;
    this.setActualSearchString();  
    this.dataSource.filter = JSON.stringify(this.filterCriteria);
  }

  onEquipoLfpSelected(equipo: string){
    console.log("Selected equipo LFP", equipo);
    this.selected_equipo_lfp = equipo;
    this.setActualSearchString(); 
    this.dataSource.filter = JSON.stringify(this.filterCriteria);
  }

  customFilter(){
    const myFilterPredicate = (jugador: JugadorLFP, filter: string) => {
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
    }

    return myFilterPredicate;
  }

  setActualSearchString(){
    this.filterCriteria = {};

    if(this.includeInSearch(this.selected_equipo)){
      this.filterCriteria["equipo"] = this.selected_equipo;
    }

    if(this.includeInSearch(this.selected_demarcacion)){
      this.filterCriteria["demarcacion"] = this.selected_demarcacion;
    }

    if(this.includeInSearch(this.selected_equipo_lfp)){
      this.filterCriteria["equipoLfp"] = this.selected_equipo_lfp;
    }

    console.log("Filter criteria is", this.filterCriteria);
  }

  includeInSearch(item:string): boolean {
    return (item != "Todos" );
  }

}
