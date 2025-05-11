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

    limit: number = 5;
    total: number = 0;
    page: number = 0;
    maxPage: number = 0;
    data: any[] = [];
    headers: string[] = ['Id', 'Nombre', 'Edad', 'Fecha Ingreso'];
    selectedId: string | null = null;

    ngOnInit() {
        this.searchClient("", this.page);
    }

   
    searchClient(id: string, offset: number): void {
        if (id) {
            this.clientService.getClientCountByName(id).subscribe((countData: any) => {
                this.total = countData.count;
                this.maxPage = Math.ceil(this.total / this.limit);
                this.clientService.getClients(id, this.limit.toString(), offset.toString()).subscribe((clientsData: ClienteServicio[]) => {
                    const rows = this.mapClientesToGenericRows(clientsData);
                    this.data = rows;
                    this.headers = Object.keys(rows[0] ?? {}); // En caso de array vacío
                    this.cargando = false;
                });
            });
        } else {
            this.clientService.getClientCount().subscribe((countData: any) => {
                this.total = countData.count;
                this.maxPage = Math.ceil(this.total / this.limit);
                this.clientService.getClients('', this.limit.toString(), offset.toString()).subscribe((clientsData: ClienteServicio[]) => {
                    const rows = this.mapClientesToGenericRows(clientsData);
                    this.data = rows;
                    this.headers = Object.keys(rows[0] ?? {}); // En caso de array vacío
                    this.cargando = false;
                });
            });
        }
    }
    mapClientesToGenericRows(clientes: ClienteServicio[]) {
        return clientes.map(c => ({
          id: c.id,
          nombre: c.nombre,
          edad: c.edad,
          fechaIngreso: c.fechaingreso,
        }));
      }
    
    prevPage(){
        if (this.page > 0) {
            this.page -= 1;
            this.searchClient('', this.page * this.limit);
        }
    }
    onSelectedIdChange(selectedId: string) {
        this.selectedId = selectedId;
      }
    nextPage(){
        if (this.page >= this.maxPage - 1) {
            return;
        }
        this.page += 1;
        this.searchClient('', this.page * this.limit);
    }
}
