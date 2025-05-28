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

  getRooms(): Observable<AllRooms> {
    return this.http.get<AllRooms>(`${this.apiUrl}/cuartosAndType`);
  }

  getBeds(id: string): Observable<AllBeds> {
    return this.http.get<AllBeds>(`${this.apiUrl}/camasAndTypeById/${id}`);
  }
}
