import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlantillasComponent } from './components/plantillas/plantillas.component';
import { JugadoresComponent } from './components/jugadores/jugadores.component';
import { AlinearComponent } from './components/alinear/alinear.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { JugadorComponent } from './components/jugador/jugador.component';
import { NormasComponent } from './components/normas/normas.component';
import { JornadasComponent } from './components/jornadas/jornadas.component';
import { JornadaActualComponent } from './components/jornada-actual/jornada-actual.component';


const routes: Routes = [
  { path: 'plantillas', component: PlantillasComponent },
  { path: 'jugadores', component: JugadoresComponent },
  { path: 'alinear', component: AlinearComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/plantillas', pathMatch: 'full' },
  { path: 'jugador/:id', component: JugadorComponent },
  { path: 'normas', component: NormasComponent },
  { path: 'jornadas', component: JornadasComponent },
  { path: 'jornada-actual', component: JornadaActualComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
