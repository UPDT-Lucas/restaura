import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private apiUrl = 'http://localhost:3100';

  constructor(private http: HttpClient) { }

  getLogs(date: Date | string, limit: string, offset: string): Observable<any> {
    console.log(date);
    console.log(limit);
    console.log(offset);
    return this.http.get<any>(`${this.apiUrl}/bitacora/${date}?limit=${limit}&offset=${offset}`);
  }

  getLastRoom(id: string, idBitacora: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getLastRoom/${id}/${idBitacora}`);
  }

  getBitacoraByFecha(fecha: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getBitacoraByFecha/${fecha}`);
  }

  createLog(date: Date | string): Observable<any> {
    const d = new Date(date); // fuerza conversión a Date
    const formattedDate = d.toISOString().split('T')[0]; // "YYYY-MM-DD"
    return this.http.post(`${this.apiUrl}/createBitacora/${formattedDate}`, {});
  }

  addClientToLog(cliente_servicio_id: string, bitacora_id: string, cama_id: string): Observable<any> {
    console.log(cliente_servicio_id, bitacora_id, cama_id);
    return this.http.post(`${this.apiUrl}/clienteSaveBitacora`, { bitacora_id, cliente_servicio_id, cama_id });
  }

  deleteClientFromLog(cliente_servicio_id: string, bitacora_id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clienteDeleteBitacora`, {
      body: { cliente_servicio_id, bitacora_id },
    });
  }

  saveDate(date: Date | string, limit: number, page: number): void {
    if (typeof date === 'string') {
      const [year, month, day] = date.split('-').map(Number);
      date = new Date(year, month - 1, day);
    }
    console.log("Saving date:", date, "Limit:", limit, "Page:", page);
    localStorage.setItem('date', date.toISOString() + "*" + limit.toString() + "*" + page.toString());
  }

  getSavedDate(): string | null {
    return localStorage.getItem('date');
  }

  removeSavedDate(): void {
    localStorage.removeItem('date');
  }

  savePage(page: number): void {
    localStorage.setItem('page', page.toString());
  }

  getSavedPage(): string | null {
    return localStorage.getItem('page');
  }


}
