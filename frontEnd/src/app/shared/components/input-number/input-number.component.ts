import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'shared-input-number',
    templateUrl: './input-number.component.html',
    styleUrls: ['./input-number.component.css'],
})
export class InputNumberComponent {
    @Input() value: any;
    @Output() valueChange = new EventEmitter<any>();

    @Input() label: string = '';
    @Input() placeholder: string = '';

    // Método para manejar el evento de input
    onInputChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        const rawValue = input.value;

        let processedValue: any;

        if (rawValue === '') {
            processedValue = null;
        } else if (!isNaN(Number(rawValue))) {
            processedValue = parseInt(rawValue, 10);
        } else {
            processedValue = rawValue; // Por si querés manejar texto o valores no numéricos más adelante
        }

        this.valueChange.emit(processedValue);
    }
}
