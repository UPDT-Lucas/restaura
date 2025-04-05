import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  imports: [],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {
  @Input() searchIcon: boolean = false;
  @Input() placeholder: string = '';
  @Input() searchTitle: string = '';
}
