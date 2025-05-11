import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteServicio } from '../interfaces/clienteServicio.interface';
import { AllInfoClient } from '../interfaces/allClient.interface';

@Injectable({
    providedIn: 'root',
})
export class ClientService {
    private apiUrl = 'http://localhost:3100';

    constructor(private http: HttpClient) {}

    addClient(cliente: ClienteServicio): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/saveCliente`, cliente);
    }

    getClients(text: string, limit: string, offset: string): Observable<ClienteServicio[]> {
        return this.http.get<ClienteServicio[]>(`${this.apiUrl}/clients/?p_id=${text}&limit=${limit}&offset=${offset}`);
    }

    getClientCountByName(id: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/getClientCountByName/${id}`);
    }

    getClientCount(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/getClientCount`);
    }

    editClient(cliente: ClienteServicio): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/updateCliente`, cliente);
    }

    getClientExist(id: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/getClienteExist/${id}`);
    }

    // deleteClient(text: id){
    //     return this.http.delete(`${this.apiUrl}/deleteCliente`);
    // }

    getAllInfoClient(id: string): Observable<AllInfoClient> {
        return this.http.get<AllInfoClient>(`${this.apiUrl}/getClienteAll/${id}`);
    }

    deleteClient(cliente_servicio_id: string, informacion_inamu_id: string|null): Observable<any> {
        return this.http.delete(`${this.apiUrl}/deleteCliente`, {
            body: {
                cliente_servicio_id,
                informacion_inamu_id,
            },
        });
    }
}
