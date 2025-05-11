import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
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
    CommonModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  public showModal: boolean = false;
  public clientIdToDelete: string | null = null;

  constructor(private clientService: ClientService){}

  @Input() headers: string[] = [];
  @Input() data: any[] = [];
  @Output() selectedIdChange = new EventEmitter<string>();
  selectedId: string | null = null; // ✅ Selección única

  ngOnInit() {
    console.log(this.data);
    console.log(this.headers); 
  }

  onCheckboxChange(selectedRow: any): void {
    this.data.forEach(row => {
      row.checked = row === selectedRow;
    });
  
    this.selectedId = selectedRow.id;
    this.selectedIdChange.emit(this.selectedId!); // 👈 Emitimos el valor
  }
  
}