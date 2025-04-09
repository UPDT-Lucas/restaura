import { Component, Input } from '@angular/core';
import { ClienteServicio } from '../../../interfaces/clienteServicio.interface';
import { ClientService } from '../../../services/client.service';
import { AllInfoClient } from '../../../interfaces/allClient.interface';

@Component({
  selector: 'shared-table',
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {

  constructor(private clientService: ClientService){}

  @Input()
  public data: ClienteServicio[] = [];


  getInamu(id: string): void {
    this.clientService.getAllInfoClient(id).subscribe((data: AllInfoClient) => {
      const inamu_id = data.inamu.id;
      this.clientService.deleteClient(id, inamu_id.toString()).subscribe((response) => {
        console.log(response);
      });
   });
  }

  // deleteClient(id: string): void {
  //   this.clientService.
  // }
}
