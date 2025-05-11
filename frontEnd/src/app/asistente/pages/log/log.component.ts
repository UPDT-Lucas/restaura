import { Component } from '@angular/core';
import { TableComponent } from '../../../shared/components/table/table.component';
import { SearchBoxComponent } from '../../../shared/components/search-box/search-box.component';
import { ClientService } from '../../../services/client.service';
import { ClienteServicio } from '../../../interfaces/clienteServicio.interface';
import { CommonModule } from '@angular/common';
import { InputDateComponent } from "../../../shared/components/input-date/input-date.component";
import { LogService } from '../../../services/log.service';
import { Client, Log } from '../../../interfaces/log.interface';
import { ConfirmDialogInputComponent } from '../../../shared/components/confirm-dialog-input/confirm-dialog-input.component';

@Component({
    selector: 'app-log',
    imports: [TableComponent, SearchBoxComponent, CommonModule, InputDateComponent, ConfirmDialogInputComponent],
    templateUrl: './log.component.html',
    styleUrl: './log.component.css',
})
export class LogComponent {
    cargando: boolean = true;
    constructor(
        private clientService: ClientService,
        private logService: LogService
    ) {}

    clients: ClienteServicio[] = [];
    logClients: any[] = [];

    limit: number = 5;
    total: number = 0;
    page: number = 0;
    maxPage: number = 0;
    date: Date | undefined;
    data: any[] = [];
    headers: string[] = ['Id', 'Nombre', 'Edad', 'Fecha Ingreso'];
    headersLog: string[] = ['Id', 'Nombre', 'Cuarto', 'Fecha Ingreso'];
    selectedId: string | null = null;
    selectedOutId: string | null = null;
    idBitacora: string | null = null;
    showAddRoomDialog: boolean = false;


    ngOnInit() {
        this.cargando = true;
        this.searchClient("", this.page);
        this.cargando = false;
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
    
    prevPage(){
        if (this.page > 0) {
            this.page -= 1;
            this.searchClient('', this.page * this.limit);
        }
    }

    nextPage(){
        if (this.page >= this.maxPage - 1) {
            return;
        }
        this.page += 1;
        this.searchClient('', this.page * this.limit);
    }

getDate(date: Date): void {
    this.date = date;
    this.logService.getLogs(date).subscribe({
        next: (logs: any) => {
        this.logClients = this.mapLogToGenericRows(logs.bitacora);
        this.headersLog = Object.keys(this.logClients[0] ?? {});
        this.idBitacora = logs.idbitacora;
        console.log('si hay', this.idBitacora);
        console.log('Bitácora ID:', this.idBitacora);
        },
        error: (err) => {
        if (err.status === 404) {
                console.log('No se encontraron logs para la fecha:', date);
                this.logService.createLog(date).subscribe((log: any) => {
                    this.idBitacora = log.data.id;
                });
        } else {
            console.error('Error desconocido al obtener logs', err);
        }
        }
  });
}

    mapClientesToGenericRows(clientes: ClienteServicio[]) {
        return clientes.map(c => ({
          id: c.id,
          nombre: c.nombre,
          edad: c.edad,
          fechaIngreso: c.fechaingreso,
        }));
      }

      mapLogToGenericRows(log: Client[]) {
        return log.map(c => ({
          id: c.id,
          nombre: c.nombre,
          cuarto: c.numeroCuarto,
          fechaIngreso: c.fechaingreso
        }));
      }

      onSelectedIdChange(selectedId: string) {
        this.selectedId = selectedId;
      }

      onSelectedOutIdChange(selectedId: string) {
        this.selectedOutId = selectedId;
        console.log('Selected ID:', this.selectedOutId);
      }

      getInClient(id: string) {
        this.logService.getLastRoom(id, this.idBitacora!).subscribe({
          next: (data: any) => {
            this.showAddRoomDialog = true;
            console.log(this.data)
          },
          error: (err) => {
            if (err.status === 409) {
                console.log("el usuario ya existe en la bitacora")
            }
          }
        });
      }

      handleInputResult(event: { confirmed: boolean, value?: string }) {
        if (event.confirmed) {
          console.log('Texto ingresado:', event.value);
          this.logService.addClientToLog(this.selectedId!, this.idBitacora! ,event.value!).
          subscribe((result: any) => {
            this.showAddRoomDialog = false;
            this.getDate(this.date!);
          })
        } else {
            this.showAddRoomDialog = false;
            console.log('Diálogo cancelado');
        }
      }

      getOutClient() {
        this.logService.deleteClientFromLog(this.selectedOutId!, this.idBitacora!).subscribe((result: any) => {
          console.log('Cliente eliminado de la bitácora:', result);
          this.getDate(this.date!);
        });
    }
}
