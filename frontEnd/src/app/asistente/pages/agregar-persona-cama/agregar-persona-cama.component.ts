import { Component } from '@angular/core';
import { LogService } from '../../../services/log.service';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../../../services/room.service';
import { Bed } from '../../../interfaces/allBeds.interface';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-agregar-persona-cama',
  imports: [],
  templateUrl: './agregar-persona-cama.component.html',
  styleUrl: './agregar-persona-cama.component.css'
})
export class AgregarPersonaCamaComponent {

  constructor(
    private logService: LogService,
    private route: ActivatedRoute,
    private roomService: RoomService,
    private adminService: AdminService
  ) { }

  allBeds: Bed[] = [];
  seletectedBed: string = "";
  userId: string | null = null;
  fecha: string | null = null;

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId');
    const idCuarto = this.route.snapshot.paramMap.get('idCuarto');
    this.fecha = this.route.snapshot.paramMap.get('fecha');
    this.roomService.getBeds(idCuarto!, this.fecha!).subscribe((beds: any) => {
      this.allBeds = beds.data;
    })
  }

  selectBed(id: string) {
    this.seletectedBed = id;

    this.logService.getBitacoraByFecha(this.fecha!).subscribe((bitacora: any) => {
      this.logService.addClientToLog(this.userId!, bitacora.bitacora_id, this.seletectedBed).subscribe((response: any) => {
        console.log(response);
      })
    })


  }
}
