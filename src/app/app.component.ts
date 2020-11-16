import { Component , OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fantas-angular';
  nombre_equipo_fb: String = String();

  constructor(){}

  ngOnInit(){
    this.nombre_equipo_fb = sessionStorage.getItem('equipoFb'); 
  }
}
