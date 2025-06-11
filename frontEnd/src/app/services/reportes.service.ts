import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminUser } from '../interfaces/adminUser.interface';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
    providedIn: 'root',
})
export class ReportesService {
    private apiUrl = 'http://localhost:3100';

    constructor(private http: HttpClient) {}

    getReporte(data: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/reporteGeneral`, data);
    }
}
