import { Component } from '@angular/core';
import { TableComponent } from '../../../shared/components/table/table.component';
import { SearchBoxComponent } from '../../../shared/components/search-box/search-box.component';

@Component({
  selector: 'app-log',
  imports: [
    TableComponent,
    SearchBoxComponent
  ],
  templateUrl: './log.component.html',
  styleUrl: './log.component.css'
})
export class LogComponent {

}
