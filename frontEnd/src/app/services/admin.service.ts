import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminUser } from '../interfaces/adminUser.interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AdminService {
    private apiUrl = 'http://localhost:3100';

    constructor(private http: HttpClient) {}

    addUser(admin: AdminUser): Observable<any> {
        return this.http.post(`${this.apiUrl}/saveAsistente`, {
            id: admin.id,
            nombre: admin.nombre,
            correo: admin.correo,
            contrasena: admin.contrasena,
            rol: admin.rol,
        });
    }

    consultas(formFilter: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/Quering`, formFilter);
    }
}
