import { Component, Input, ViewChild } from '@angular/core';
import { ClienteServicio } from '../../../interfaces/clienteServicio.interface';
import { ClientService } from '../../../services/client.service';
import { AllInfoClient } from '../../../interfaces/allClient.interface';
import { RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from '../snackbar/snackbar.component';
@Component({
  selector: 'shared-table',
  imports: [
    RouterModule,
    ConfirmDialogComponent,
    CommonModule,
    SnackbarComponent

  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  public showModal: boolean = false;
  public clientIdToDelete: string | null = null;

  constructor(private clientService: ClientService){}

  @Input()
  public data: ClienteServicio[] = [];
  @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;

  confirmDelete(clientId: string) {
    
    this.clientIdToDelete = clientId;
    this.showModal = true;
    
  }
  

  onConfirmDelete(confirmed: boolean): void {
    this.showModal = false;
    
    if( confirmed && this.clientIdToDelete) {
      const id = this.clientIdToDelete;
      this.clientService.getAllInfoClient(id).subscribe((data: AllInfoClient) => {
        let inamu_id: string | null = null;
        if(data.inamu !== null && data.inamu !== undefined) {
          inamu_id = data.inamu.id.toString();
        }else{
          inamu_id = null;
        }
        
        this.clientService.deleteClient(id, inamu_id).subscribe((response) => {
          
          if(response.status === 200){ 

            this.snackbar.show('Usuario eliminado correctamente',3000);

          }else{

            this.snackbar.show('Error al eliminar el cliente', 3000);

          }

        });
     });
     this.clientIdToDelete = null;
    }
    
  }

  // deleteClient(id: string): void {
  //   this.clientService.
  // }
}
