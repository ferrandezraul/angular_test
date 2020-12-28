import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { pairwise, startWith } from 'rxjs/operators';
import { ApiService } from 'src/app/service/api.service';
import { Jugador, JugadorAlineado } from 'src/app/shared/shared';
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

      // {id: 14, idCampeonato: 1, name: "jornada 14", jornadaLfp: 16, state: "alineable"}

      if (response.length == 0) {
         return;
      }

      this.nombreJornada = response[0].name
      this.idJornada = response[0].id

      this.apiService.getPlantillaFromCurrentUser().subscribe((jugadores: Jugador[]) => {
        // console.log("Plantilla es ", jugadores);
        this.readPlantilla(jugadores);

        this.apiService.getAlineacionByJornada(this.idJornada).subscribe((ultimaAlineacion: JugadorAlineado[]) => {
          if (ultimaAlineacion.length == 12) {
            console.log("Ultima alineacion", ultimaAlineacion);
            this.setJugadoresSelected(ultimaAlineacion);
            // TODO: this.cargarAlineacion(ultima_alineacion)
          } else {
            this.apiService.getUltimaJornadaTerminada().subscribe((response) => {
              this.apiService.getAlineacionByJornada(response.id.toString()).subscribe((ultimaAlineacionTer: JugadorAlineado[]) => {
                console.log("Ultima alineacion ter", ultimaAlineacionTer);
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

  setTactica(defensas: number, medios: number, delanteros: number){
    let tactica: string  = defensas.toString() + '-' + medios.toString() + '-' + delanteros.toString();
    console.log("Setting tactica ", tactica);

    this.tacticaForm.setValue({
      tacticaSelected: tactica, 
      porteroSelected: null,
      defensaSelected1: null,
      defensaSelected2: null,
      defensaSelected3: null,
      defensaSelected4: null,
      defensaSelected5: null,
      medioSelected1: null,
      medioSelected2: null,
      medioSelected3: null,
      medioSelected4: null,
      medioSelected5: null,
      delanteroSelected1: null,
      delanteroSelected2: null,
      delanteroSelected3: null,
      reservaSelected: null
    })
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

  setJugadoresSelected(jugadores: JugadorAlineado[]){
    // Detectar tactica y setearla
    // Detectar jugadores por posicion y setearlos

    let defensasNum: number = 0;
    let mediosNum: number = 0;
    let delanterosNum: number = 0;

    for(let jugador of jugadores){
      if (!jugador.suplente){
        let pelotero = this.jugadoresPlantilla.find( (player) => { 
          return player.id === jugador.idJugador
        });

        if(pelotero){
          console.log("Se encontro a ", pelotero);

          if (pelotero.demarcacion == "Defensa"){
            defensasNum += 1;
          }
          if (pelotero.demarcacion == "Medio"){
            mediosNum += 1;
          }
          if (pelotero.demarcacion == "Delantero"){
            delanterosNum += 1;
          }
        }
      }
    }

    console.log("Defensas", defensasNum);
    console.log("Medios", mediosNum);
    console.log("Delanteros", delanterosNum);

    this.setTactica(defensasNum, mediosNum, delanterosNum);
  }

}
