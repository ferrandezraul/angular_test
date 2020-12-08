import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  nombre_equipo_fb: String = String();

  constructor() { }

  ngOnInit(): void {
    this.nombre_equipo_fb = sessionStorage.getItem('equipoFb'); 
  }

}
