import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

    porterosPlantilla: Jugador[];
    defensasPlantilla: Jugador[];
    mediosPlantilla: Jugador[];
    delanterosPlantilla: Jugador[];

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
        console.log("Plantilla es ", jugadores);
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
      porteroSelected: ['', Validators.required],
      defensaSelected: ['', Validators.required],
      medioSelected: ['', Validators.required],
      delanteroSelected: ['', Validators.required],
    });

    this.onTacticaSelected('3-4-3');
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

  onPorteroSelected(portero: string){
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

  readPlantilla(jugadores: Jugador[]){
    this.porterosPlantilla = [];
    this.defensasPlantilla = [];
    this.mediosPlantilla = [];
    this.delanterosPlantilla = [];

    for( let jugador of jugadores){
      if(jugador.idDemarcacion == 1){
        this.porterosPlantilla.push(jugador);
      } else if( jugador.idDemarcacion == 2){
        this.defensasPlantilla.push(jugador);
      } else if( jugador.idDemarcacion == 3){
        this.mediosPlantilla.push(jugador);
      } else if( jugador.idDemarcacion == 4){
        this.delanterosPlantilla.push(jugador);
      }
    }

    console.log("Stored porteros", this.porterosPlantilla);
    console.log("Stored defensas", this.defensasPlantilla);
    console.log("Stored medios", this.mediosPlantilla);
    console.log("Stored delanteros", this.delanterosPlantilla);
  }

  enviarAlineacion() {
    // console.log("Enviar alineacion con", alineacion);
  }

}
