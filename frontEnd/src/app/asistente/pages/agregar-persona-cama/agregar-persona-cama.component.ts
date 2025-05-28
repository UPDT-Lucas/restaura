import { Component } from '@angular/core';
import { LogService } from '../../../services/log.service';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../../../services/room.service';
import { Bed } from '../../../interfaces/allBeds.interface';

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
    private roomService: RoomService
  ) {}

  allBeds: Bed[] = [];

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('idUser');
    const idCuarto = this.route.snapshot.paramMap.get('idCuarto');
    this.roomService.getBeds(idCuarto!).subscribe((beds: any) => {
        this.allBeds = beds.data;
    })
  }


  // test() {
  //   this.logService.getLastRoom(id, this.idBitacora!).subscribe({
  //     next: (data: any) => {
  //       this.showAddRoomDialog = true;
  //       this.cuarto = data.numeroCuarto.toString();
  //     },
  //     error: (err) => {
  //       if (err.status === 409) {
  //         this.showDuplicateBitacora = true;
  //       } else if (err.status === 404) {
  //         this.showAddRoomDialog = true;
  //         this.cuarto = "Nunca ha estado en un cuarto";
  //       }
  //     }
  //   });
  // }

}
