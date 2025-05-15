import { Component } from '@angular/core';
import { TableComponent } from '../../../shared/components/table/table.component';
import { SearchBoxComponent } from '../../../shared/components/search-box/search-box.component';
import { ClientService } from '../../../services/client.service';
import { ClienteServicio } from '../../../interfaces/clienteServicio.interface';
import { CommonModule } from '@angular/common';
import { InputDateComponent } from "../../../shared/components/input-date/input-date.component";
import { LogService } from '../../../services/log.service';
import { Client } from '../../../interfaces/log.interface';
import { ConfirmDialogInputComponent } from '../../../shared/components/confirm-dialog-input/confirm-dialog-input.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-log',
  imports: [TableComponent, SearchBoxComponent, CommonModule, InputDateComponent, ConfirmDialogInputComponent, ConfirmDialogComponent],
  templateUrl: './log.component.html',
  styleUrl: './log.component.css',
})
export class LogComponent {
  cargando: boolean = true;
  constructor(
    private clientService: ClientService,
    private logService: LogService
  ) { }

  clients: ClienteServicio[] = [];
  logClients: any[] = [];

  limit: number = 5;
  total: number = 0;
  page: number = 0;
  maxPage: number = 0;

  limitLog: number = 5;
  totalLog: number = 0;
  pageLog: number = 0;
  maxLog: number = 0;

  date: Date | undefined;
  data: any[] = [];
  headers: string[] = ['Id', 'Nombre', 'Edad', 'Fecha Ingreso'];
  headersLog: string[] = ['Id', 'Nombre', 'Cuarto', 'Fecha Ingreso'];
  selectedId: string | null = null;
  selectedOutId: string | null = null;
  idBitacora: string | null = null;
  showAddRoomDialog: boolean = false;
  showNewBitacora: boolean = false;
  showInfoBitacora: boolean = false;
  showDuplicateBitacora: boolean = false;

  dialogText = ""
  dialogTitle = ""

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

  prevPage() {
    if (this.page > 0) {
      this.page -= 1;
      this.searchClient('', this.page * this.limit);
    }
  }

  nextPage() {
    if (this.page >= this.maxPage - 1) {
      return;
    }
    this.page += 1;
    this.searchClient('', this.page * this.limit);
  }

  prevLogPage() {
    if (this.pageLog > 0) {
      this.pageLog -= 1;
      this.getDate(this.date!, this.pageLog * this.limitLog);
    }
  }

  nextLogPage() {
    if (this.pageLog >= this.maxLog - 1) {
      return;
    }
    this.pageLog += 1;
    this.getDate(this.date!, this.pageLog * this.limitLog);
  }

  getDate(date: Date, offset: number): void {
    this.date = date;
    this.logService.getLogs(date, this.limitLog.toString(), offset.toString()).subscribe({
      next: (logs: any) => {
        this.logClients = this.mapLogToGenericRows(logs.bitacora);
        console.log(this.logClients);
        this.headersLog = Object.keys(this.logClients[0] ?? {});
        this.idBitacora = logs.idbitacora;
        this.totalLog = logs.total;
        this.maxLog = Math.ceil(this.totalLog / this.limitLog);
      },
      error: (err) => {
        if (err.status === 404) {
          this.showNewBitacora = true;
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
  }

  getInClient(id: string) {
    if(!this.idBitacora) {
      return;
    }
    this.logService.getLastRoom(id, this.idBitacora!).subscribe({
      next: (data: any) => {
        this.showAddRoomDialog = true;
        console.log(this.data)
      },
      error: (err) => {
        if (err.status === 409) {
          this.showDuplicateBitacora = true;
        }
      }
    });
  }

  handleInputResult(event: { confirmed: boolean, value?: string }) {
    if (event.confirmed) {
      console.log('Texto ingresado:', event.value);
      this.logService.addClientToLog(this.selectedId!, this.idBitacora!, event.value!).
        subscribe((result: any) => {
          this.showAddRoomDialog = false;
          this.getDate(this.date!, this.pageLog * this.limitLog);
        })
    } else {
      this.showAddRoomDialog = false;
      console.log('Diálogo cancelado');
    }
  }

  handleNewBitacora(confirmed: boolean) {
    if (confirmed) {
      this.showNewBitacora = false;
      this.logService.createLog(this.date!).subscribe((log: any) => {
        this.idBitacora = log.data.id;
        this.showInfoBitacora = true;
      });
    }
    this.showNewBitacora = false;
  }

  handleInfoBitacora(confirmed: boolean) {
    if (confirmed) {
      this.showInfoBitacora = false;
    }
    this.showInfoBitacora = false;
  }

  handleDuplicateBitacora(confirmed: boolean) {
    if (confirmed) {
      this.showDuplicateBitacora = false;
    }
    this.showDuplicateBitacora = false;
  }

  getOutClient() {
    if(!this.selectedOutId){
      return;
    }
    this.logService.deleteClientFromLog(this.selectedOutId!, this.idBitacora!).subscribe((result: any) => {
      console.log('Cliente eliminado de la bitácora:', result);
      this.getDate(this.date!, this.pageLog * this.limitLog);
      console.log(this.logClients);
    });
  }
}
