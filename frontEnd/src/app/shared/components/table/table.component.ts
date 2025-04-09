import { Component, Input } from '@angular/core';
import { ClienteServicio } from '../../../interfaces/clienteServicio.interface';

@Component({
  selector: 'shared-table',
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input()
  public data: ClienteServicio[] = [];
}
