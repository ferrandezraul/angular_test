import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Jornada } from 'src/app/shared/shared';

@Component({
  selector: 'app-jornadas',
  templateUrl: './jornadas.component.html',
  styleUrls: ['./jornadas.component.css']
})
export class JornadasComponent implements OnInit {
  jornadasTerminadas: Jornada[];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getJornadasTerminadas().subscribe((jornadasTerminada) => {
      this.jornadasTerminadas = jornadasTerminada.filter( (jornada) => jornada.id > 0 );
    });
  }

}
