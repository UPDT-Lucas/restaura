import { Component } from '@angular/core';
import { LogService } from '../../../services/log.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../../services/room.service';
import { Bed } from '../../../interfaces/allBeds.interface';
import { AdminService } from '../../../services/admin.service';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agregar-persona-cama',
  imports: [
    ConfirmDialogComponent,
    CommonModule,
  ],
  templateUrl: './agregar-persona-cama.component.html',
  styleUrl: './agregar-persona-cama.component.css'
})
export class AgregarPersonaCamaComponent {

  constructor(
    private logService: LogService,
    private route: ActivatedRoute,
    private roomService: RoomService,
    private adminService: AdminService,
    private router: Router
  ) { }

  allBeds: Bed[] = [];
  selectedBed: any;
  userId: string | null = null;
  fecha: string | null = null;
  roomId: string | null = null;
  showGetInConfirm: boolean = false;
  showUserAdded: boolean = false;

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.roomId = this.route.snapshot.paramMap.get('idCuarto');
    this.fecha = this.route.snapshot.paramMap.get('fecha');
    this.roomService.getBeds(this.roomId!, this.fecha!).subscribe((beds: any) => {
      console.log(beds);
      this.allBeds = beds.data;
    })
  }

  selectBed(bed: any) {
    this.selectedBed = bed;
    this.showGetInConfirm = true;
  }

  handleGetInConfirm(confirmed: boolean) {
    if (confirmed) {
      this.logService.getBitacoraByFecha(this.fecha!).subscribe((bitacora: any) => {
        this.logService.addClientToLog(this.userId!, bitacora.bitacora_id, this.selectedBed.id).subscribe((response: any) => {
          this.showUserAdded = true;
        })
      })
      this.showGetInConfirm = false;
    }
    this.showGetInConfirm = false;
  }

  handleUserAdded(confirmed: boolean) {
    if (confirmed) {
      this.showUserAdded = false;
      this.router.navigate(['/log']);
    }
  }
}
