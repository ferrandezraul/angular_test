import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { JugadoresService } from './jugadores.service';

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

/**
 * Data source for the Player view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class JugadorLFPDataSource extends DataSource<JugadorLFP> {
    data: JugadorLFP[];
    paginator: MatPaginator;
    sort: MatSort;
  
    constructor(jugadores: JugadorLFP[]) {
        super();
        this.data = jugadores;
    }

    /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<JugadorLFP[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: JugadorLFP[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: JugadorLFP[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'demarcacion': return compare(a.demarcacion, b.demarcacion, isAsc);
        case 'equipoFb': return compare(a.equipoFb, b.equipoFb, isAsc);
        case 'puntosTotal': return compare(a.puntosTotal, b.puntosTotal, isAsc);
        case 'puntosMarca': return compare(a.puntosMarca, b.puntosMarca, isAsc);
        case 'nombre': return compare(a.nombre, b.nombre, isAsc);
        case 'puntosOtros': return compare(a.puntosOtros, b.puntosOtros, isAsc);
        case 'url': return compare(a.url, b.url, isAsc);
        case 'equipoLfp': return compare(a.equipoLfp, b.equipoLfp, isAsc);
        case 'puntosAs': return compare(+a.puntosAs, +b.puntosAs, isAsc);
        case 'precio': return compare(+a.precio, +b.precio, isAsc);
        case 'puntosGanados': return compare(+a.puntosGanados, +b.puntosGanados, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'puntosJugados': return compare(+a.puntosJugados, +b.puntosJugados, isAsc);
        case 'puntosCalculados': return compare(+a.puntosCalculados, +b.puntosCalculados, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}