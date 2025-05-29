import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CuartosService {
    private apiUrl = 'http://localhost:3100';

    constructor(private http: HttpClient) {}

    /* CUARTOS */
    getCuartos(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/cuartos`);
    }

    getCuarto(idCuarto: any): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/cuarto/${idCuarto}`);
    }

    addCuarto(cuarto: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/addCuarto`, cuarto);
    }

    editCuarto(cuarto: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/editCuarto`, cuarto);
    }

    deleteCuarto(id: any): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/deleteCuarto`, {
            body: { id },
        });
    }

    /* CAMAS */
    getCamasByIdCuarto(idCuarto: any): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/camasbyId/${idCuarto}`);
    }

    getCama(idCama: any): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/cama/${idCama}`);
    }

    addCama(cama: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/addCama`, cama);
    }

    editCama(cama: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/editCama`, cama);
    }

    deleteCama(id: any): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/deleteCama`, {
            body: { id },
        });
    }

    /* TIPO CUARTO */
    getTiposCuartos(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/getAllTiposCuartos`);
    }

    getTipoCuarto(id: any): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/getTipoCuarto/${id}`);
    }

    /* TIPO CAMA */
    getTiposCamas(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/getAllTiposCamas`);
    }

    getTipoCama(id: any): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/getTipoCama/${id}`);
    }
}
