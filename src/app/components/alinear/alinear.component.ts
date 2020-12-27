import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { pairwise, startWith } from 'rxjs/operators';
import { ApiService } from 'src/app/service/api.service';
import { Jugador } from 'src/app/shared/shared';
import { AlineacionDialog } from './alineacion-dialog/alineacion-dialog.component';

@Component({
  selector: 'app-plantillas',
  templateUrl: './alinear.component.html',
  styleUrls: ['./alinear.component.css'],
})
export class AlinearComponent implements OnInit {
    nombreJornada = ""
    idJornada = "0"
    plantilla = {}
    nombres_jugadores = []
    selected_jugador: String[] = []

    jugadoresPlantilla: Jugador[];
    porterosPlantilla: Jugador[];
    defensasPlantilla: Jugador[];
    mediosPlantilla: Jugador[];
    delanterosPlantilla: Jugador[];
    reservasPlantilla: Jugador[];

    numberOfDefensas: number[];
    numberOfMedios: number[];
    numberOfDelanteros: number[];
    tacticaForm: FormGroup;

  constructor(private apiService: ApiService,
              private formBuilder: FormBuilder,
              public dialog: MatDialog ) { }

  ngOnInit() {
    this.apiService.getJornadaAlineable().subscribe((response) => {
      console.log("Response de jornada alineable es ", response);

      // if (response.length == 0) {
      //   this.nombreJornada = "NO HAY JORNADA ALINEABLE";
      //   return;
      // }

      // this.nombreJornada = response[0].name
      // this.idJornada = response[0].id

      this.apiService.getPlantillaFromCurrentUser().subscribe((jugadores: Jugador[]) => {
        // console.log("Plantilla es ", jugadores);
        this.readPlantilla(jugadores);
      });

      return;

      this.apiService.getPlantillaFromCurrentUser().subscribe((response: any[]) => {
        console.log("Plantilla es ", response);
        for (var i = 0; i < response.length; i++) {
          var j = response[i]
          this.plantilla[j["id"]] = j["nombreJugador"]
          this.nombres_jugadores.push(j["nombreJugador"])
        }

        this.apiService.getAlineacionByJornada(this.idJornada).subscribe((ultima_alineacion: any[]) => {
          if (ultima_alineacion.length == 12) {
            // TODO: this.cargarAlineacion(ultima_alineacion)
          } else {
            this.apiService.getUltimaJornadaTerminada().subscribe((response) => {
              this.apiService.getAlineacionByJornada(response.id.toString()).subscribe((ultima_alineacion_ter: any[]) => {
                // TODO  this.cargarAlineacion(ultima_alineacion_ter)
              });
            });
          }
        });
      });

    });

    this.createTacticaForm();

  } // ngOnInit

  createTacticaForm() {
    this.tacticaForm = this.formBuilder.group({
      tacticaSelected: ['3-4-3', Validators.required],
      porteroSelected: [null, Validators.required],
      defensaSelected1: [null, Validators.required],
      defensaSelected2: [null, Validators.required],
      defensaSelected3: [null, Validators.required],
      defensaSelected4: [null, Validators.required],
      defensaSelected5: [null, Validators.required],
      medioSelected1: [null, Validators.required],
      medioSelected2: [null, Validators.required],
      medioSelected3: [null, Validators.required],
      medioSelected4: [null, Validators.required],
      medioSelected5: [null, Validators.required],
      delanteroSelected1: [null, Validators.required],
      delanteroSelected2: [null, Validators.required],
      delanteroSelected3: [null, Validators.required],
      reservaSelected: [null, Validators.required],
    });

    this.onTacticaSelected('3-4-3');

    this.tacticaForm.valueChanges.pipe(startWith(this.tacticaForm.value),pairwise()).subscribe(
      ([old,value])=>{
        console.log("Detectando cambios");
        console.log(old,value);
      }
    )
  }

  tacticas() {
    return ["3-4-3",
            "3-5-2",
            "4-3-3",
            "4-4-2",
            "4-5-1",
            "5-3-2",
            "5-4-1"]
  }

  onTacticaSelected(tactica: string){
    console.log("Selected tactica", tactica);

    let defensas = tactica.split("-")[0];
    let medios = tactica.split("-")[1];
    let delanteros = tactica.split("-")[2];

    this.numberOfDefensas = new Array(parseInt(defensas, 10));
    this.numberOfMedios = new Array(parseInt(medios, 10));
    this.numberOfDelanteros = new Array(parseInt(delanteros, 10));
  }

  porterosTactica(){
    return 1;
  }

  defensasTactica(){
    return this.numberOfDefensas;
  }

  mediosTactica(){
    return this.numberOfMedios;
  }

  delanterosTactica(){
    return this.numberOfDelanteros;
  }

  porteros(){
    return this.porterosPlantilla;
  }

  defensas(){
    return this.defensasPlantilla;
  }

  medios(){
    return this.mediosPlantilla;
  }

  delanteros(){
    return this.delanterosPlantilla;
  }

  jugadores(){
    return this.jugadoresPlantilla;
  }

  reservas(){
    return this.reservasPlantilla;
  }

  onPorteroSelected(portero: Jugador){
    console.log("Selected portero", portero);
  }

  onDefensaSelected(defensa: string){
    console.log("Selected defensa", defensa);
  }

  onMedioSelected(medio: string){
    console.log("Selected medio", medio);
  }

  onDelanteroSelected(delantero: string){
    console.log("Selected delantero", delantero);
  }

  onReservaSelected(reserva: string){
    console.log("Selected reserva", reserva);
  }

  readPlantilla(jugadores: Jugador[]){
    this.jugadoresPlantilla = jugadores;
    this.reservasPlantilla = jugadores;
    this.porterosPlantilla = jugadores.filter( (value: Jugador) => value.idDemarcacion == 1 );
    this.defensasPlantilla = jugadores.filter( (value: Jugador) => value.idDemarcacion == 2 );
    this.mediosPlantilla = jugadores.filter( (value: Jugador) => value.idDemarcacion == 3 );
    this.delanterosPlantilla = jugadores.filter( (value: Jugador) => value.idDemarcacion == 4 );
  }

  hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
  }

  jugadoresValidos(jugadores: Jugador[]): boolean {
    let jugadoresSeleccionados = jugadores.every( (jugador) => jugador != null);
    let duplicatedDefensa = this.hasDuplicates(jugadores);
    
    return (jugadoresSeleccionados && !duplicatedDefensa);
  }

  enviarAlineacion() {
    let portero: Jugador = this.tacticaForm.get("porteroSelected").value;
    let defensas: Jugador[] = [];
    let medios: Jugador[] = [];
    let delanteros: Jugador[] = [];
    let reserva: Jugador = this.tacticaForm.get("reservaSelected").value;

    for(let i = 0; i < this.numberOfDefensas.length; i++) {
      defensas.push(this.tacticaForm.get("defensaSelected" + (i +1)).value);
    }

    for(let i = 0; i < this.numberOfMedios.length; i++) {
      medios.push(this.tacticaForm.get("medioSelected" + (i +1)).value);
    }

    for(let i = 0; i < this.numberOfDelanteros.length; i++) {
      delanteros.push(this.tacticaForm.get("delanteroSelected" + (i +1)).value);
    }

    let alineacion = [];
    alineacion.push(portero);
    alineacion = alineacion.concat(defensas);
    alineacion = alineacion.concat(medios);
    alineacion = alineacion.concat(delanteros);
    alineacion.push(reserva);

    if (this.jugadoresValidos(alineacion) == false) {
      console.log("Alineacion invalida. Jugadores vacios o repetidos");

      const dialogRef = this.dialog.open(AlineacionDialog, {
        width: '250px',
        data: { alineacion: alineacion }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog closed with result: ${result}`); 
      });
    } else {
      console.log("Alineacion valida", alineacion);

      // TODO: realizar el post con la alineacion
    }
  }

}
