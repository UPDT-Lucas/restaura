import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteServicio } from '../interfaces/clienteServicio.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:3100';

  constructor(private http: HttpClient) {}

    getClients(text: string, limit: string, offset: string): Observable<ClienteServicio []> {
        return this.http.get<ClienteServicio[]>(`${this.apiUrl}/clients/?p_id=${text}&limit=${limit}&offset=${offset}`);
    }
}
