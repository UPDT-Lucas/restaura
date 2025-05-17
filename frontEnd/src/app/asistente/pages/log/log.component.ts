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
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';

@Component({
  selector: 'app-log',
  imports: [TableComponent, DynamicTableComponent, SearchBoxComponent, CommonModule, InputDateComponent, ConfirmDialogInputComponent, ConfirmDialogComponent],
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
  page: number = 1;
  maxPage: number = 0;

  limitLog: number = 5;
  totalLog: number = 0;
  pageLog: number = 1;
  maxLog: number = 0;

  date: Date | undefined;
  data: any[] = [];
  headers: string[] = ['Id', 'Nombre', 'Edad', 'Fecha Ingreso'];
  headersLog: string[] = ['Id', 'Nombre', 'Cuarto', 'Fecha Ingreso'];
  selectedId: string = "";
  selectedOutId: string | null = null;
  idBitacora: string | null = null;
  showAddRoomDialog: boolean = false;
  showNewBitacora: boolean = false;
  showInfoBitacora: boolean = false;
  showDuplicateBitacora: boolean = false;
  tableData: string[][] = [this.headers];
  tableDataLog: string[][] = [this.headersLog];
  clientId: string = "";

  dialogText = ""
  dialogTitle = ""

  ngOnInit() {
    this.cargando = true;
    this.searchClient("", (this.page-1));
    this.cargando = false;
  }

  searchClient(id: string, offset: number): void {
    if (id) {
      this.clientId = id
      if(this.page == 1){
        offset = 0;
      }
      this.clientService.getClientCountByName(id).subscribe((countData: any) => {
        this.total = countData.count;
        this.maxPage = Math.ceil(this.total / this.limit);
        this.clientService.getClients(id, this.limit.toString(), offset.toString()).subscribe((clientsData: ClienteServicio[]) => {
          const rows = this.mapClientesToGenericRows(clientsData);
          this.cargando = false;
          this.tableData = [this.headers, ... this.rowsToArray(rows)];
        });
      });
    } else {
      this.clientId = "";
      this.clientService.getClientCount().subscribe((countData: any) => {
        console.log(offset, this.limit)
        this.total = countData.count;
        this.maxPage = Math.ceil(this.total / this.limit);
        this.clientService.getClients('', this.limit.toString(), offset.toString()).subscribe((clientsData: ClienteServicio[]) => {
          const rows = this.mapClientesToGenericRows(clientsData);
          this.cargando = false;
          this.tableData = [this.headers, ... this.rowsToArray(rows)];
        });
      });
    }
  }

  onUpdatePage(page: number) {
    this.page = page;
    this.searchClient(this.clientId, (this.page - 1) * this.limit);
  }

  onUpdateLimit(limit: number) {
    this.limit = limit;
    this.page = 1;
    this.searchClient(this.clientId, (this.page-1)*this.limit);
  }

  onUpdatePageLog(page: number) {
    this.pageLog = page;
    this.getDate(this.date!, (this.pageLog-1)*this.limitLog);
  }

  onUpdateLimitLog(limit: number) {
    this.limitLog = limit;
    this.pageLog = 1;
    this.getDate(this.date!, this.pageLog * this.limitLog);
  }

  getDate(date: Date, offset: number): void {
    this.date = date;
    if(this.pageLog == 1){
      offset = 0;
    }
    console.log(date, this.limitLog.toString(), offset.toString())
    this.logService.getLogs(date, this.limitLog.toString(), offset.toString()).subscribe({
      next: (logs: any) => {
        this.logClients = this.mapLogToGenericRows(logs.bitacora);
        this.idBitacora = logs.idbitacora;
        this.totalLog = logs.total;
        this.maxLog = Math.ceil(this.totalLog / this.limitLog);
        this.tableDataLog = [this.headers, ... this.rowsToArray(this.logClients)];
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

  private rowsToArray(rows: any[]): string[][] {
    return rows.map(r =>
      Object.values(r).map(v => String(v))
    );
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

  onSelectedIdChange(selectedId: string | null) {
    if(selectedId){
      this.selectedId = selectedId;
    }
  }

  onSelectedOutIdChange(selectedId: string) {
    if(selectedId){
      this.selectedOutId = selectedId;
    }
  }

  getInClient(id: string) {
    if (!this.idBitacora || !this.selectedId) {
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
      this.logService.addClientToLog(this.selectedId!, this.idBitacora!, event.value!).
        subscribe((result: any) => {
          this.showAddRoomDialog = false;
          if (this.logClients.length % this.limitLog == 0) {
            this.pageLog = this.pageLog + 1;
          }
          this.getDate(this.date!, (this.pageLog-1) * this.limitLog);
        })
    } else {
      this.showAddRoomDialog = false;
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
    if (!this.selectedOutId) {
      return;
    }
    this.logService.deleteClientFromLog(this.selectedOutId!, this.idBitacora!).subscribe((result: any) => {
      console.log('Cliente eliminado de la bitácora:', result);
      if(this.logClients.length % this.limitLog == 1){
        this.pageLog = this.pageLog - 1;
      }
      this.getDate(this.date!, this.pageLog * this.limitLog);
    });
  }
}
