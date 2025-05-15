import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private apiUrl = 'http://localhost:3100';

  constructor(private http: HttpClient) {}

  getLogs(date: Date, limit: string, offset: string): Observable<any> {
    console.log(date);
    console.log(limit);
    console.log(offset);
    return this.http.get<any>(`${this.apiUrl}/bitacora/${date}?limit=${limit}&offset=${offset}`);
  }

  getLastRoom(id: string, idBitacora: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getLastRoom/${id}/${idBitacora}`);
  }

  createLog(date: Date | string): Observable<any> {
    const d = new Date(date); // fuerza conversión a Date
    const formattedDate = d.toISOString().split('T')[0]; // "YYYY-MM-DD"
    return this.http.post(`${this.apiUrl}/createBitacora/${formattedDate}`, {});
  }

  addClientToLog(cliente_servicio_id: string, bitacora_id: string, cuarto: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/clienteSaveBitacora`, { cliente_servicio_id, bitacora_id, numerocuarto: cuarto });
  }

  deleteClientFromLog(cliente_servicio_id: string, bitacora_id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clienteDeleteBitacora`, {
      body: { cliente_servicio_id, bitacora_id },
    });
  }


}
