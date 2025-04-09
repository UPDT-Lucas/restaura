import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CantonesService {
    private apiUrl = 'http://localhost:3100/cantones';

    constructor(private http: HttpClient) {}

    getCantonesPorProvincia(p_provincia_id: string | number): Observable<any> {
        const url = `${this.apiUrl}/${p_provincia_id}`;
        return this.http.get<any>(url);
    }
}
