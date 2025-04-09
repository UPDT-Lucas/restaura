import { Component, EventEmitter, Input, input, Output } from '@angular/core';

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

  @Output() onValue = new EventEmitter<string>();

  onInputChange(event: Event){
    const input = event.target as HTMLInputElement;
    this.onValue.emit(input.value);
  }
}
