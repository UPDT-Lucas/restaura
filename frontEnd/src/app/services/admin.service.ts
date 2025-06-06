import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminUser } from '../interfaces/adminUser.interface';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

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

    getBitacoraSistema(): Observable<any> {
        return this.http.get(`${this.apiUrl}/getBitacora`);
    }

    getMovimientosBitacora(id: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/getMovimientosBitacora/${id}`);
    }

    consultas(formFilter: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/Quering`, formFilter);
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/auth`, {correo: email, contrasena: password});
    }

    guardarToken(token: string) {
        localStorage.setItem('token', token);
    }

    decodeToken(token: string): any {
        return jwtDecode(token);
    }

    obtenerToken(): string | null {
        return localStorage.getItem('token');
    }

    logout(): void {
        localStorage.removeItem('token'); // o sessionStorage.clear()
    }
}
