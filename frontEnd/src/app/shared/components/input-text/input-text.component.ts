import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'shared-input-text',
    templateUrl: './input-text.component.html',
    styleUrls: ['./input-text.component.css'],
})
export class InputTextComponent {
    @Input() value: any;
    @Output() valueChange = new EventEmitter<any>();
    @Input() label: string = '';
    @Input() placeholder: string = '';
    @Input() disabled: boolean = false;

    // Método para manejar el evento de input
    onInputChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        const value = input.value === '' ? null : input.value;
        this.valueChange.emit(value);
    }
}
