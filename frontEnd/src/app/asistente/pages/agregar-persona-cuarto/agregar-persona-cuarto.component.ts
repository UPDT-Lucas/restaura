import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../../services/room.service';
import { AllRooms, Room } from '../../../interfaces/allRooms.interface';

@Component({
  selector: 'app-agregar-persona-cuarto',
  imports: [
  ],
  templateUrl: './agregar-persona-cuarto.component.html',
  styleUrl: './agregar-persona-cuarto.component.css'
})
export class AgregarPersonaCuartoComponent {

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private router: Router
  ) {}

  allRooms: Room[] = [];
  seletectedRoom: string = '';
  userId: string | null = null;
  fecha : string | null = null;

  ngOnInit(){
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.fecha = this.route.snapshot.paramMap.get('fecha');
    this.roomService.getRooms(this.fecha!).subscribe( (roomsResponse: any) => {
      this.allRooms  = roomsResponse.data;
    })
  }

  selectRoom(roomId: string) {
    this.seletectedRoom = roomId;
    this.router.navigate(['/asignar-cama', this.userId, roomId, this.fecha]);
  }
  
} 
