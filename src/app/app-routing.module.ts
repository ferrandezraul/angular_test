import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlantillasComponent } from './plantillas/plantillas.component';
import { JugadoresComponent } from './jugadores/jugadores.component';
import { AlinearComponent } from './alinear/alinear.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { JugadorComponent } from './jugador/jugador.component';
import { NormasComponent } from './normas/normas.component';
import { JornadaComponent } from './jornada/jornada.component';


const routes: Routes = [
  { path: 'plantillas', component: PlantillasComponent },
  { path: 'jugadores', component: JugadoresComponent },
  { path: 'alinear', component: AlinearComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/plantillas', pathMatch: 'full' },
  { path: 'jugador/:id', component: JugadorComponent },
  { path: 'normas', component: NormasComponent },
  { path: 'jornada', component: JornadaComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
