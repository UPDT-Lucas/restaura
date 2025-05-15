import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ClienteServicio } from '../../../interfaces/clienteServicio.interface';
import { ClientService } from '../../../services/client.service';
import { AllInfoClient } from '../../../interfaces/allClient.interface';
import { RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'shared-table',
  imports: [
    RouterModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  public showModal: boolean = false;
  public clientIdToDelete: string | null = null;

  constructor(private clientService: ClientService) { }

  @Input() headers: string[] = [];
  @Input() data: any[] = [];
  @Output() selectedIdChange = new EventEmitter<string>();
  selectedId: string | null = null;

  ngOnInit() {
    console.log(this.data);
    console.log(this.headers);
  }

  onCheckboxChange(row: any): void {
    if (row.checked) {
      this.selectedId = row.id;
      this.selectedIdChange.emit(this.selectedId!);
    } else {
      this.selectedId = null;
      this.selectedIdChange.emit(null!);
    }

    console.log(row.checked);
  }


}
