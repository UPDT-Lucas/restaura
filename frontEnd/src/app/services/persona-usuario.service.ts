import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PersonaUsuarioService {
    private apiUrlAdd = 'http://localhost:3100/saveCliente';

    constructor(private http: HttpClient) {}

    addUser(data: any): Observable<any> {
        return this.http.post<any>(this.apiUrlAdd, data);
    }
}
