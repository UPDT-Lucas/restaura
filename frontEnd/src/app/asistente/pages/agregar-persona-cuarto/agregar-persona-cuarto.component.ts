import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllRooms, Room } from '../../../interfaces/allRooms.interface';
import { CollectionsService } from '../../../services/collections.service';
import { CuartosService } from '../../../services/cuartos.service';

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
    private roomService: CuartosService,
    private router: Router,
    private room: CollectionsService
  ) {}

  allRooms: Room[] = [];
  seletectedRoom: string = '';
  userId: string | null = null;
  fecha : string | null = null;
  roomTypes: any[] = [];


  ngOnInit(){
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.fecha = this.route.snapshot.paramMap.get('fecha');
    this.roomService.getRooms(this.fecha!).subscribe( (roomsResponse: any) => {
      this.allRooms  = roomsResponse.data;
      this.getRoomTypes();
    })
  }

  selectRoom(roomId: string) {
    this.seletectedRoom = roomId;
    this.router.navigate(['/asignar-cama', this.userId, roomId, this.fecha]);
  }

  getRoomTypes(){
    this.roomService.getTiposCuartos().subscribe((response: any) => {
      this.roomTypes = response.tiposCuartos;
    });
  }
} 
