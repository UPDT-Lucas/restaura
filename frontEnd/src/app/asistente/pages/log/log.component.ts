import { Component } from '@angular/core';
import { TableComponent } from '../../../shared/components/table/table.component';
import { SearchBoxComponent } from '../../../shared/components/search-box/search-box.component';
import { ClientService } from '../../../services/client.service';
import { ClienteServicio } from '../../../interfaces/clienteServicio.interface';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-log',
    imports: [TableComponent, SearchBoxComponent, CommonModule],
    templateUrl: './log.component.html',
    styleUrl: './log.component.css',
})
export class LogComponent {
    cargando: boolean = true;
    constructor(private clientService: ClientService) {}

    clients: ClienteServicio[] = [];

    ngOnInit() {
        this.searchClientById('');
    }

    searchClientById(id: string): void {
        this.clientService.getClients(id, '10', '0').subscribe((data: ClienteServicio[]) => {
            this.clients = data;
            this.cargando = false;
        });
    }
}
