import { MatTableDataSource } from '@angular/material/table';

// resultado de un jugador una jornada
export class Resultado {
    jornada: string;
    nombreJugador: string;
    puntosMarca: number;
    puntosAs: number;
    puntosCalculados: number;
    jugado: number;
    ganado: number;
    otros: number;
    total: number;
}

export class JornadaJugador {
    nombreJugador: string;
    demarcacion: string;
    resultado: ResultadoJugador;
    puntosCalculados: number;
    resultadoPartido: number;
    jugado: number;
    otros: number;
    total: number;
    chapeco: boolean;
}

export class ResultadoJugador {
    id: number;
    idCampeonato: number;
    idJugador: number;
    idJornada: number;
    puntosMarca: number;
    puntosAs: number;
    golesMarcados: number;
    golesPp: number;
    asistencias: number;
    tarjetaRoja: number;
    dobleAmarilla: number;
    penaltisMarcados: number;
    penaltisCometidos: number;
    penaltisParados: number;
    penaltisFallados: number;
    resultado: number;
    golesEncajados: number;
}

export interface Plantilla {
    nombre: string;
    creditos: number;
    jugadores: Jugador[] | MatTableDataSource<Jugador>;
}

export interface Jugador {
    demarcacion: string;
    id: number;
    idDemarcacion: number;
    idEquipoFb: number;
    nombreEquipo: string
    nombreJugador: string
    price: number
    url: string
}

export interface JugadorLFP {
    demarcacion: string;
    equipoFb: string;
    puntosTotal: number;
    puntosMarca: number;
    puntosAs: number;
    nombre: string;
    puntosOtros: number;
    url: string;
    precio: number;
    puntosGanados: number;
    id: number;
    puntosJugados: number;
    puntosCalculados: number;
    equipoLfp: string
  }

export interface PuntuacionJugador {
    nombreJugador: string;
    demarcacion: string;
    resultado: ResultadoJugador;
    puntosCalculados: number; 
    resultadoPartido: number;
    jugado: number;
    otros: number;
    total: number;
    chapeco: boolean;
    suplente: boolean;
    estado: string;
    iconoDemarcacion: string;
    equipoLfp: string;
}

export interface ResultadoPartido {
    equipoLocal: string;
    equipoVisitante: string;
    puntuacionLocal: PuntuacionJugador[];
    puntuacionVisitante: PuntuacionJugador[];
    puntosLocalesTotales: number;
    puntosVisitantesTotales: number;
    golesLocales: number;
    golesVisitantes: number;
    useSuplenteLocal: boolean;
    useSuplenteVisitante: true;
    extraLocal: number;
    extraVisitante: number;
    puntosLocMarcaTotales: number;
    puntosLocAsTotales: number;
    puntosLocCalculadosTotales: number;
    puntosLocJugadoTotales: number;
    puntosLocResultadoTotales: number;
    puntosLocOtrosTotales: number;
    puntosVisMarcaTotales: number;
    puntosVisAsTotales: number;
    puntosVisCalculadosTotales: number;
    puntosVisJugadoTotales: number;
    puntosVisResultadoTotales: number;
    puntosVisOtrosTotales: number;
}

export interface Jornada {
    id: number;
    idCampeonato: number;
    name: string;
    jornadaLfp: number;
    state: string;
}

export interface PartidoLFP {
    equipoLocal: string;
    equipoVisitante: string;
    horaPartido: string;
}

export interface PartidoFB {
    equipoLocal: string;
    equipoVisitante: string;
}

export interface Alineacion {
    jugadores: JugadorAlineado[];
}

export interface JugadorAlineado {
    id: number;
    idCampeonato: number;
    idEquipoFb: number;
    idJornada: number;
    idJugador: number;
    suplente: boolean;
}

// Ejemplo Jornada 16 LFP/FB
// [
//     {
//         "equipoLocal": "Celta",
//         "equipoVisitante": "Villarreal",
//         "horaPartido": "Vie 08/01  21:00h"
//     },
//     {
//         "equipoLocal": "Sevilla",
//         "equipoVisitante": "Real Sociedad",
//         "horaPartido": "Sab 09/01  14:00h"
//     },
//     {
//         "equipoLocal": "Atletico",
//         "equipoVisitante": "Athletic",
//         "horaPartido": "Sab 09/01  16:15h"
//     },
//     {
//         "equipoLocal": "Granada",
//         "equipoVisitante": "Barcelona",
//         "horaPartido": "Sab 09/01  18:30h"
//     },
//     {
//         "equipoLocal": "Osasuna",
//         "equipoVisitante": "Real Madrid",
//         "horaPartido": "Sab 09/01  21:00h"
//     },
//     {
//         "equipoLocal": "Levante",
//         "equipoVisitante": "Eibar",
//         "horaPartido": "Dom 10/01  14:00h"
//     },
//     {
//         "equipoLocal": "Cadiz",
//         "equipoVisitante": "Alaves",
//         "horaPartido": "Dom 10/01  16:15h"
//     },
//     {
//         "equipoLocal": "Elche",
//         "equipoVisitante": "Getafe",
//         "horaPartido": "Dom 10/01  18:30h"
//     },
//     {
//         "equipoLocal": "Valladolid",
//         "equipoVisitante": "Valencia",
//         "horaPartido": "Dom 10/01  21:00h"
//     },
//     {
//         "equipoLocal": "Huesca",
//         "equipoVisitante": "Betis",
//         "horaPartido": "Lun 11/01  21:00h"
//     }
// ]