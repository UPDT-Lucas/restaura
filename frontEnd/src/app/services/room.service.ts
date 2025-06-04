import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllRooms } from '../interfaces/allRooms.interface';
import { Observable } from 'rxjs';
import { AllBeds } from '../interfaces/allBeds.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = 'http://localhost:3100';

  constructor(private http: HttpClient) {}

  getRooms(fecha: string): Observable<AllRooms> {
    return this.http.get<AllRooms>(`${this.apiUrl}/cuartosAndType/${fecha}`);
  }

  getBeds(id: string, fecha: Date | string): Observable<AllBeds> {
    return this.http.get<AllBeds>(`${this.apiUrl}/camasAndTypeById/${id}/${fecha}`);
  }
}
