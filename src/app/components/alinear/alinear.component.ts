import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { pairwise, startWith } from 'rxjs/operators';
import { ApiService } from 'src/app/service/api.service';
import { Jugador } from 'src/app/shared/shared';

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
              private formBuilder: FormBuilder ) { }

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

        // Si el cambio es un reserva, no hacemos nada
        if(old.tacticaSelected != value.tacticaSelected) {
          // TODO: Reset 
          this.tacticaForm.setValue({
            tacticaSelected: value.tacticaSelected,
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
          });

          this.reservasPlantilla = this.jugadoresPlantilla;
          return;
        }    

        // Si el cambio es un reserva, no hacemos nada
        if(old.reservaSelected != value.reservaSelected) {
          return;
        }      

        // Si habia un jugador seleccionado antes, meterlo a lista de reservas 
        if(old.porteroSelected != value.porteroSelected){
          console.log("Cambio de portero");
          // Quitar jugador seleccionado de la lista de reservas
          this.removeJugadorFromBanquillo(value.porteroSelected);
          if(old.porteroSelected){
            console.log("Portero al banquillo", old.porteroSelected);
            this.reservasPlantilla.push(old.porteroSelected);
          }
        }

        if(old.defensaSelected1 != value.defensaSelected1){
          console.log("Cambio de defensa");
          // Quitar jugador seleccionado de la lista de reservas
          this.removeJugadorFromBanquillo(value.defensaSelected1);
          if(old.defensaSelected1){
            console.log("Defensa al banquillo", old.defensaSelected1);
            this.reservasPlantilla.push(old.defensaSelected1);
          }
        }

        if(old.defensaSelected2 != value.defensaSelected2){
          console.log("Cambio de defensa");
          // Quitar jugador seleccionado de la lista de reservas
          this.removeJugadorFromBanquillo(value.defensaSelected2);
          if(old.defensaSelected2){
            console.log("Defensa al banquillo", old.defensaSelected2);
            this.reservasPlantilla.push(old.defensaSelected2);
          }
        }

        if(old.defensaSelected3 != value.defensaSelected3){
          console.log("Cambio de defensa");
          // Quitar jugador seleccionado de la lista de reservas
          this.removeJugadorFromBanquillo(value.defensaSelected3);
          if(old.defensaSelected3){
            console.log("Defensa al banquillo", old.defensaSelected3);
            this.reservasPlantilla.push(old.defensaSelected3);
          }
        }

        if(old.defensaSelected4 != value.defensaSelected4){
          console.log("Cambio de defensa");
          // Quitar jugador seleccionado de la lista de reservas
          this.removeJugadorFromBanquillo(value.defensaSelected4);
          if(old.defensaSelected4){
            console.log("Defensa al banquillo", old.defensaSelected4);
            this.reservasPlantilla.push(old.defensaSelected4);
          }
        }

        if(old.defensaSelected5 != value.defensaSelected5){
          console.log("Cambio de defensa");
          // Quitar jugador seleccionado de la lista de reservas
          this.removeJugadorFromBanquillo(value.defensaSelected5);
          if(old.defensaSelected5){
            console.log("Defensa al banquillo", old.defensaSelected5);
            this.reservasPlantilla.push(old.defensaSelected5);
          }
        }

        if(old.medioSelected1 != value.medioSelected1){
          console.log("Cambio de medio");
          // Quitar jugador seleccionado de la lista de reservas
          this.removeJugadorFromBanquillo(value.medioSelected1);
          if(old.medioSelected1){
            console.log("Medio al banquillo", old.medioSelected1);
            this.reservasPlantilla.push(old.medioSelected1);
          }
        }

        if(old.medioSelected2 != value.medioSelected2){
          console.log("Cambio de medio");
          // Quitar jugador seleccionado de la lista de reservas
          this.removeJugadorFromBanquillo(value.medioSelected2);
          if(old.medioSelected2){
            console.log("Medio al banquillo", old.medioSelected2);
            this.reservasPlantilla.push(old.medioSelected2);
          }
        }

        if(old.delanteroSelected1 != value.delanteroSelected1){
          console.log("Cambio de delantero");
          // Quitar jugador seleccionado de la lista de reservas
          this.removeJugadorFromBanquillo(value.delanteroSelected1);
          if(old.delanteroSelected1){
            console.log("Delantero al banquillo", old.delanteroSelected1);
            this.reservasPlantilla.push(old.delanteroSelected1);
          }
        }

        if(old.delanteroSelected2 != value.delanteroSelected2){
          console.log("Cambio de delantero");
          // Quitar jugador seleccionado de la lista de reservas
          this.removeJugadorFromBanquillo(value.delanteroSelected2);
          if(old.delanteroSelected2){
            console.log("Delantero al banquillo", old.delanteroSelected2);
            this.reservasPlantilla.push(old.delanteroSelected2);
          }
        }

        if(old.delanteroSelected3 != value.delanteroSelected3){
          console.log("Cambio de delantero");
          // Quitar jugador seleccionado de la lista de reservas
          this.removeJugadorFromBanquillo(value.delanteroSelected3);
          if(old.delanteroSelected3){
            console.log("Delantero al banquillo", old.delanteroSelected3);
            this.reservasPlantilla.push(old.delanteroSelected3);
          }
        }

      }
    )
  }

  removeJugadorFromBanquillo(jugador: Jugador){
    // Quitar jugador seleccionado de la lista de reservas
    const index: number = this.reservasPlantilla.indexOf(jugador);
    if (index !== -1) {
        console.log("Eliminando de reservas a ", this.reservasPlantilla[index]);
        this.reservasPlantilla.splice(index, 1);
    }   
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

    // quitar todos los porteros de reservasPlantilla
    // obtener lista de porteros menos el selected
    // anyadir resultado de arriba a reservasPlantilla

    //this.reservasPlantilla = this.reservasPlantilla.filter( (value: Jugador) => value != portero);
  }

  onDefensaSelected(defensa: string){
    console.log("Selected defensa", defensa);
    //this.reservasPlantilla = this.reservasPlantilla.filter( (value: Jugador) => value.nombreJugador != defensa);
  }

  onMedioSelected(medio: string){
    console.log("Selected medio", medio);
    //this.reservasPlantilla = this.reservasPlantilla.filter( (value: Jugador) => value.nombreJugador != medio);
  }

  onDelanteroSelected(delantero: string){
    console.log("Selected delantero", delantero);
    //this.reservasPlantilla = this.reservasPlantilla.filter( (value: Jugador) => value.nombreJugador != delantero);
  }

  onReservaSelected(reserva: string){
    console.log("Selected reserva", reserva);
    //this.reservasPlantilla = this.jugadoresPlantilla.filter( (value: Jugador) => value.nombreJugador != delantero);
  }

  readPlantilla(jugadores: Jugador[]){
    this.jugadoresPlantilla = jugadores;
    this.reservasPlantilla = jugadores;
    this.porterosPlantilla = jugadores.filter( (value: Jugador) => value.idDemarcacion == 1 );
    this.defensasPlantilla = jugadores.filter( (value: Jugador) => value.idDemarcacion == 2 );
    this.mediosPlantilla = jugadores.filter( (value: Jugador) => value.idDemarcacion == 3 );
    this.delanterosPlantilla = jugadores.filter( (value: Jugador) => value.idDemarcacion == 4 );

    // console.log("Stored porteros", this.porterosPlantilla);
    // console.log("Stored defensas", this.defensasPlantilla);
    // console.log("Stored medios", this.mediosPlantilla);
    // console.log("Stored delanteros", this.delanterosPlantilla);
  }

  enviarAlineacion() {
    // console.log("Enviar alineacion con", alineacion);
  }

}
