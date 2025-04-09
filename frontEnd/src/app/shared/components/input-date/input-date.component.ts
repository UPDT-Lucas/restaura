import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'shared-input-date',
    templateUrl: './input-date.component.html',
    styleUrls: ['./input-date.component.css'],
    standalone: true,
})
export class InputDateComponent {
    @Input() value: any;
    @Output() valueChange = new EventEmitter<any>();

    @Input() label: string = 'Fecha';
    @Input() placeholder: string = '';
    @Input() disabled: boolean = false;

    // Método para manejar el evento de input
    onInputChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.valueChange.emit(input.value);
    }
}
