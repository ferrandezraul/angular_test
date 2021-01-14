import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Jornada } from 'src/app/shared/shared';

@Component({
  selector: 'app-jornada-actual',
  templateUrl: './jornada-actual.component.html',
  styleUrls: ['./jornada-actual.component.css']
})
export class JornadaActualComponent implements OnInit {
  jornadaActual: Jornada;
  errorMessage: string = "";

  constructor( private apiService: ApiService ) { }

  ngOnInit(): void {
    this.apiService.getJornadaJugandose().subscribe((jornadaJugandose) => {
      if (jornadaJugandose.length == 0) {
        console.log('No hay jornada en juego');
        return;
      };

      this.jornadaActual =jornadaJugandose[0];
      console.log('Jornada jugandose', this.jornadaActual);
    },
    err => {
      this.errorMessage = err;
    });

  }

}
