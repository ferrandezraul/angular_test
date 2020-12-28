import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlantillasComponent } from './components/plantillas/plantillas.component';
import { JugadoresComponent } from './components/jugadores/jugadores.component';
import { AlinearComponent } from './components/alinear/alinear.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { JugadorComponent } from './components/jugador/jugador.component';
import { NormasComponent } from './components/normas/normas.component';
import { JornadaComponent } from './components/jornada/jornada.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './service/auth-interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from  '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LogOutDialog } from './components/toolbar/log-out-dialog/log-out-dialog.component';
import { AlineacionDialog } from './components/alinear/alineacion-dialog/alineacion-dialog.component';
import { AlineacionValidaDialog } from './components/alinear/alineacion-valida/alineacion-valida.component';

@NgModule({
  declarations: [
    AppComponent,
    PlantillasComponent,
    JugadoresComponent,
    AlinearComponent,
    LoginComponent,
    PageNotFoundComponent,
    JugadorComponent,
    NormasComponent,
    JornadaComponent,
    ToolbarComponent,
    LogOutDialog,
    AlineacionDialog,
    AlineacionValidaDialog,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatTooltipModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatSortModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    //{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  entryComponents: [
    LogOutDialog,
    AlineacionDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
