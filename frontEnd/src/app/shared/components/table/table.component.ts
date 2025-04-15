import { Component, Input } from '@angular/core';
import { ClienteServicio } from '../../../interfaces/clienteServicio.interface';
import { ClientService } from '../../../services/client.service';
import { AllInfoClient } from '../../../interfaces/allClient.interface';
import { RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'shared-table',
  imports: [
    RouterModule,
    ConfirmDialogComponent,
    CommonModule

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
          console.log(response);
        });
     });
     this.clientIdToDelete = null;
    }
    
  }

  // deleteClient(id: string): void {
  //   this.clientService.
  // }
}
