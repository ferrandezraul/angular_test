import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { pairwise, startWith } from 'rxjs/operators';
import { ApiService } from 'src/app/service/api.service';
import { PartidoLFP, PartidoFB, Jugador, JugadorAlineado } from 'src/app/shared/shared';
import { AlineacionInvalidaDialog } from './alineacion-invalida/alineacion-invalida-dialog.component';
import { AlineacionValidaDialog } from './alineacion-valida/alineacion-valida-dialog.component';

@Component({
  selector: 'app-plantillas',
  templateUrl: './alinear.component.html',
  styleUrls: ['./alinear.component.css'],
})
export class AlinearComponent implements OnInit {
  nombreJornada: string;
  idJornada: string;

  partidosFB: PartidoFB[];
  partidosFB2: PartidoFB[] = [
    {
        "equipoLocal": "Golguen",
        "equipoVisitante": "Birrarreal"
    },
    {
        "equipoLocal": "Atletico Tritrankilos",
        "equipoVisitante": "Beka Digital"
    },
    {
        "equipoLocal": "Real Balonpedica Macutense",
        "equipoVisitante": "Sankt Putin"
    },
    {
        "equipoLocal": "Roland Guarros",
        "equipoVisitante": "Crema Catalana"
    },
    {
        "equipoLocal": "Chicharro SV",
        "equipoVisitante": "Rivertide jaja"
    }
  ];


  partidosLFP: PartidoLFP[];
  partidosLFP2: PartidoLFP[] = [
    {
        "equipoLocal": "Celta",
        "equipoVisitante": "Villarreal",
        "horaPartido": "Vie 08/01  21:00h"
    },
    {
        "equipoLocal": "Sevilla",
        "equipoVisitante": "Real Sociedad",
        "horaPartido": "Sab 09/01  14:00h"
    },
    {
        "equipoLocal": "Atletico",
        "equipoVisitante": "Athletic",
        "horaPartido": "Sab 09/01  16:15h"
    },
    {
        "equipoLocal": "Granada",
        "equipoVisitante": "Barcelona",
        "horaPartido": "Sab 09/01  18:30h"
    },
    {
        "equipoLocal": "Osasuna",
        "equipoVisitante": "Real Madrid",
        "horaPartido": "Sab 09/01  21:00h"
    },
    {
        "equipoLocal": "Levante",
        "equipoVisitante": "Eibar",
        "horaPartido": "Dom 10/01  14:00h"
    },
    {
        "equipoLocal": "Cadiz",
        "equipoVisitante": "Alaves",
        "horaPartido": "Dom 10/01  16:15h"
    },
    {
        "equipoLocal": "Elche",
        "equipoVisitante": "Getafe",
        "horaPartido": "Dom 10/01  18:30h"
    },
    {
        "equipoLocal": "Valladolid",
        "equipoVisitante": "Valencia",
        "horaPartido": "Dom 10/01  21:00h"
    },
    {
        "equipoLocal": "Huesca",
        "equipoVisitante": "Betis",
        "horaPartido": "Lun 11/01  21:00h"
    }
  ]

  jugadoresPlantilla: Jugador[];
  porterosPlantilla: Jugador[];
  defensasPlantilla: Jugador[];
  mediosPlantilla: Jugador[];
  delanterosPlantilla: Jugador[];
  reservasPlantilla: Jugador[];

  porteroSelected: Jugador;
  defensasSelected: Jugador[] = [];
  mediosSelected: Jugador[] = [];
  delanterosSelected: Jugador[] = [];
  reservaSelected: Jugador;

  numberOfDefensas: number[];
  numberOfMedios: number[];
  numberOfDelanteros: number[];
  tacticaForm: FormGroup;

  constructor(private apiService: ApiService,
              private formBuilder: FormBuilder,
              public dialog: MatDialog ) { }

  ngOnInit() {
    this.apiService.getJornadaAlineable().subscribe((response) => {
      // console.log("Response de jornada alineable es ", response);
      // i.e.: {id: 14, idCampeonato: 1, name: "jornada 14", jornadaLfp: 16, state: "alineable"}

      if (response.length == 0) {
         return;
      }

      this.nombreJornada = response[0].name
      this.idJornada = response[0].id

      this.apiService.getPlantillaFromCurrentUser().subscribe((jugadores: Jugador[]) => {
        this.readPlantilla(jugadores);

        this.apiService.getAlineacionByJornada(this.idJornada).subscribe((ultimaAlineacion: JugadorAlineado[]) => {
          if (ultimaAlineacion.length == 12) {
            console.log("Ultima alineacion", ultimaAlineacion);
            this.setJugadoresSelected(ultimaAlineacion);
          } else {
            this.apiService.getUltimaJornadaTerminada().subscribe((response) => {
              this.apiService.getAlineacionByJornada(response.id.toString()).subscribe((ultimaAlineacionTer: JugadorAlineado[]) => {
                console.log("Ultima alineacion ter", ultimaAlineacionTer);
                this.setJugadoresSelected(ultimaAlineacionTer);
              });
            });
          }
        });

      });

      this.apiService.getJornadaLFP(this.idJornada).subscribe( (response) => {
        console.log("Jornada LFP", response);
        this.partidosLFP = response;
      });

      this.apiService.getJornadaFB(this.idJornada).subscribe( (response) => {
        console.log("Jornada FP", response);
        this.partidosFB = response;
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
        //console.log("Detectando cambios");
        //console.log(old,value);
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
    this.onTacticaSelected(tactica);

    this.tacticaForm.setValue({
      tacticaSelected: tactica, 
      porteroSelected: this.porteroSelected,
      defensaSelected1: this.defensasSelected[0],
      defensaSelected2: this.defensasSelected[1],
      defensaSelected3: this.defensasSelected[2],
      defensaSelected4: this.defensasSelected[3] || null,
      defensaSelected5: this.defensasSelected[4] || null,
      medioSelected1: this.mediosSelected[0],
      medioSelected2: this.mediosSelected[1],
      medioSelected3: this.mediosSelected[2],
      medioSelected4: this.mediosSelected[3] || null,
      medioSelected5: this.mediosSelected[4] || null,
      delanteroSelected1: this.delanterosSelected[0],
      delanteroSelected2: this.delanterosSelected[1] || null,
      delanteroSelected3: this.delanterosSelected[2] || null,
      reservaSelected: this.reservaSelected || null
    })
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

    if(!this.alineacionValida(alineacion)) {
      return;
    }

    let alineacionIds = alineacion.map( jugador => jugador.id.toString() );
    console.log("Alineacion a enviar es ", alineacionIds);
    
    this.apiService.sendAlineacion(alineacionIds,this.idJornada).subscribe( response => {
      this.mostrarDialogAlineacionValida(response),
      (err: any) => console.log("Error enviando alineacion", err)
    });
  }

  setJugadoresSelected(jugadores: JugadorAlineado[]){
    let defensasNum: number = 0;
    let mediosNum: number = 0;
    let delanterosNum: number = 0;

    for(let jugador of jugadores){
      let pelotero = this.jugadoresPlantilla.find( (player) => { 
        return player.id === jugador.idJugador
      });

      if (!jugador.suplente){
        if(pelotero){
          if (pelotero.demarcacion == "Portero"){
            this.porteroSelected = pelotero;
          }
          if (pelotero.demarcacion == "Defensa"){
            this.defensasSelected.push(pelotero);
            defensasNum += 1;
          }
          if (pelotero.demarcacion == "Medio"){
            this.mediosSelected.push(pelotero);
            mediosNum += 1;
          }
          if (pelotero.demarcacion == "Delantero"){
            this.delanterosSelected.push(pelotero);
            delanterosNum += 1;
          }
        }
      } else {
        this.reservaSelected = pelotero;
      }
    }

    this.setTactica(defensasNum, mediosNum, delanterosNum);
  }

  alineacionValida(alineacion): boolean {
    if (this.jugadoresValidos(alineacion) == true) {
      return true;
    }

    this.dialog.open(AlineacionInvalidaDialog, {
      data: { alineacion: alineacion }
    });

    return false;
  }

  mostrarDialogAlineacionValida(response){
    if (response.result == "OK"){
      this.dialog.open(AlineacionValidaDialog);
    }
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
    //console.log("Selected portero", portero);
  }

  onDefensaSelected(defensa: string){
    //console.log("Selected defensa", defensa);
  }

  onMedioSelected(medio: string){
    //console.log("Selected medio", medio);
  }

  onDelanteroSelected(delantero: string){
    //console.log("Selected delantero", delantero);
  }

  onReservaSelected(reserva: string){
    //console.log("Selected reserva", reserva);
  }

}
