import { Component, EventEmitter, Input, input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  imports: [],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {
    @Input() searchIcon: boolean = false;
    @Input() value: string = '';
    @Output() valueChange = new EventEmitter<any>();
    @Output() blurChange = new EventEmitter<string>();
    @Input() label: string = '';
    @Input() placeholder: string = '';
    @Input() disabled: boolean = false;
    @Input() error: string = '';
    touched: boolean = false;

    // Método para manejar el evento de input
    onInputChange(event: Event): void {
        const input = event.target as HTMLInputElement;

        const value = input.value === '' ? null : input.value;
        this.valueChange.emit(value);
    }

    onBlur(): void {
        this.touched = true;
        this.blurChange.emit(this.value);
    }

}
