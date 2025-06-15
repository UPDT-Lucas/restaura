import { Component } from '@angular/core';
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
import { Router } from '@angular/router';
import { SelectComponent } from "../../../shared/components/select/select.component";

@Component({
  selector: 'app-log',
  imports: [DynamicTableComponent, SearchBoxComponent, CommonModule, InputDateComponent, ConfirmDialogComponent, SelectComponent],
  templateUrl: './log.component.html',
  styleUrl: './log.component.css',
})
export class LogComponent {
  cargando: boolean = true;
  constructor(
    private clientService: ClientService,
    private logService: LogService,
    private router: Router
  ) { }

  clients: ClienteServicio[] = [];
  logClients: any[] = [];

  searchOptions: { label: string, value: string }[] = [
    { label: 'Todos', value: 'all' },
    { label: 'Por identificación', value: 'id' },
    { label: 'Por Nombre', value: 'name' }
  ]

  selectedSearchOption: string = 'all';

  limit: number = 5;
  total: number = 0;
  page: number = 1;
  maxPage: number = 0;

  limitLog: number = 5;
  totalLog: number = 0;
  pageLog: number = 1;
  maxLog: number = 0;

  date: Date | string | undefined;
  data: any[] = [];
  headers: string[] = ['Id', 'Nombre', 'Edad', 'Fecha Registro'];
  headersLog: string[] = ['Id', 'Nombre', 'Cuarto', 'Cama', 'Fecha Registro'];
  selectedId: string = "";
  selectedOutId: string | null = null;
  idBitacora: string | null = null;
  showRoomInfo: boolean = false;
  showNewBitacora: boolean = false;
  showInfoBitacora: boolean = false;
  showDuplicateBitacora: boolean = false;
  showMissingSelection: boolean = false;
  showMissingOutSelection: boolean = false;
  showGetOutConfirm: boolean = false;
  tableData: string[][] = [this.headers];
  tableDataLog: string[][] = [this.headersLog];
  selectedOptionText: string = "";
  cuarto: string | null = null;
  dialogText = ""
  dialogTitle = ""
  lastRoom: string = "";

  ngOnInit() {
    this.cargando = true;
    const [savedDate, savedLimit, savedPage] = this.logService.getSavedDate()?.split('*') || [];

    if (savedDate) {
      this.date = savedDate.toString().split('T')[0];
      this.limitLog = parseInt(savedLimit);
      this.pageLog = parseInt(savedPage);
      this.onUpdatePageLog(this.pageLog);
    }

    const savedPageLeft = this.logService.getSavedPage();
    if (savedPageLeft) {
      this.onUpdatePage(parseInt(savedPageLeft));
    } else {
      this.searchClient("", (this.page - 1));
    }

    this.cargando = false;
  }

  searchClient(optionText: string, offset: number): void {
    if (this.page == 1) {
      offset = 0;
    }
    if (this.selectedSearchOption === 'id') {
      this.selectedOptionText = optionText
      this.searchClientsById(optionText, offset);
    } else if (this.selectedSearchOption === 'name') {
      this.selectedOptionText = optionText
      this.searchClientsByName(optionText, offset);
    } else {
      this.searchAllCients(offset);
    }
  }

  getAllClients(value: string): void {
    this.page = 1;
    if (value === 'all') {
      this.searchAllCients(0);
    }
  }

  searchAllCients(offset: number): void {
    this.clientService.getClientCount().subscribe((countData: any) => {
      this.total = countData.count;
      this.maxPage = Math.ceil(this.total / this.limit);
      this.clientService.getClients('', this.limit.toString(), offset.toString()).subscribe((clientsData: ClienteServicio[]) => {
        const rows = this.mapClientesToGenericRows(clientsData);
        this.cargando = false;
        this.tableData = [this.headers, ... this.rowsToArray(rows)];
      });
    });
  }

  searchClientsByName(name: string, offset: number): void {
    this.clientService.getClientCountByName(name).subscribe((countData: any) => {
      this.total = countData.count;
      this.maxPage = Math.ceil(this.total / this.limit);
      this.clientService.getClientsByName(name, this.limit.toString(), offset.toString()).subscribe((clientsData: ClienteServicio[]) => {
        const rows = this.mapClientesToGenericRows(clientsData);
        this.cargando = false;
        this.tableData = [this.headers, ... this.rowsToArray(rows)];
      });
    });
  }

  searchClientsById(id: string, offset: number): void {
    this.clientService.getClientCountById(id).subscribe((countData: any) => {
      this.total = countData.count;
      this.maxPage = Math.ceil(this.total / this.limit);
      this.clientService.getClientsById(id, this.limit.toString(), offset.toString()).subscribe((clientsData: ClienteServicio[]) => {
        const rows = this.mapClientesToGenericRows(clientsData);
        this.cargando = false;
        this.tableData = [this.headers, ... this.rowsToArray(rows)];
      });
    });
  }


  onUpdatePage(page: number) {
    this.page = page;
    this.logService.savePage(page);
    this.searchClient(this.selectedOptionText, (this.page - 1) * this.limit);
  }

  onUpdateLimit(limit: number) {
    this.limit = limit;
    this.page = 1;
    this.searchClient(this.selectedOptionText, (this.page - 1) * this.limit);
  }

  onUpdatePageLog(page: number) {
    this.pageLog = page;
    this.getDate(this.date!, (this.pageLog - 1) * this.limitLog);
  }

  onUpdateLimitLog(limit: number) {
    this.limitLog = limit;
    this.pageLog = 1;
    this.getDate(this.date!, this.pageLog * this.limitLog);
  }

  getDate(date: Date | string, offset: number): void {
    this.date = date;
    if (this.pageLog == 1) {
      offset = 0;
    }
    console.log(date, this.limitLog.toString(), offset.toString())
    this.logService.getLogs(date, this.limitLog.toString(), offset.toString()).subscribe({
      next: (logs: any) => {
        this.logClients = this.mapLogToGenericRows(logs.bitacora);
        this.idBitacora = logs.idbitacora;
        this.totalLog = logs.total;
        this.maxLog = Math.ceil(this.totalLog / this.limitLog);
        this.tableDataLog = [this.headersLog, ... this.rowsToArray(this.logClients)];
        console.log(date, this.limitLog, this.pageLog);
        this.logService.saveDate(date, this.limitLog, this.pageLog);
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
      cuarto: c.cuarto,
      cama: c.cama,
      fechaIngreso: c.fechaingreso
    }));
  }

  onSelectedIdChange(selectedId: string | null) {
    if (selectedId) {
      this.selectedId = selectedId;
    }
  }

  onSelectedOutIdChange(selectedId: string) {
    if (selectedId) {
      this.selectedOutId = selectedId;
    }
  }
  lastBed: string | null = null;

  getInClient(id: string) {
    if (!this.idBitacora || !this.selectedId) {
      this.showMissingSelection = true;
      return;
    }
    this.logService.getLastRoom(id, this.idBitacora!).subscribe({
      next: (data: any) => {
        this.lastRoom = data.data.cuartonombre;
        this.lastBed = data.data.camanombre;
        this.showRoomInfo = true;
      },
      error: (err) => {
        if (err.status === 409) {
          this.showDuplicateBitacora = true;
        } else if (err.status === 404) {
          this.router.navigate(['/asignar-cuarto', id, this.date]);
        }
      }
    });
  }

  handleInputResult(event: { confirmed: boolean, value?: string }) {
    if (event.confirmed) {
      this.logService.addClientToLog(this.selectedId!, this.idBitacora!, event.value!).
        subscribe((result: any) => {
          if (this.logClients.length % this.limitLog == 0) {
            this.pageLog = this.pageLog + 1;
          }
          this.getDate(this.date!, (this.pageLog - 1) * this.limitLog);
        })
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

  handleMissingSelection(confirmed: boolean) {
    if (confirmed) {
      this.showMissingSelection = false;
    }
    this.showMissingSelection = false;
  }


  handleMissingOutSelection(confirmed: boolean) {
    if (confirmed) {
      this.showMissingOutSelection = false;
    }
    this.showMissingOutSelection = false;
  }

  handleRoomInfo(confirmed: boolean) {
    if (confirmed) {
      this.showRoomInfo = false;
      this.router.navigate(['/asignar-cuarto', this.selectedId, this.date]);
    }
    this.showRoomInfo = false;
  }

  handleDuplicateBitacora(confirmed: boolean) {
    if (confirmed) {
      this.showDuplicateBitacora = false;
    }
    this.showDuplicateBitacora = false;
  }

  handleGetOutConfirm(confirmed: boolean) {
    if (confirmed) {
      this.logService.deleteClientFromLog(this.selectedOutId!, this.idBitacora!).subscribe((result: any) => {
        if (this.logClients.length % this.limitLog == 1) {
          this.pageLog = this.pageLog - 1;
        }
        this.getDate(this.date!, this.pageLog * this.limitLog);
      });
      this.showGetOutConfirm = false;
    }
    this.showGetOutConfirm = false;
  }

  getOutClient() {
    if (!this.selectedOutId || !this.idBitacora) {
      this.showMissingOutSelection = true;
      return;
    }
    this.showGetOutConfirm = true;
  }
}
