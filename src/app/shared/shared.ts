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
