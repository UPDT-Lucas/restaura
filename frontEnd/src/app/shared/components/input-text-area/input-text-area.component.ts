import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'shared-input-text-area',
    templateUrl: './input-text-area.component.html',
    styleUrls: ['./input-text-area.component.css'],
    standalone: true,
})
export class InputTextAreaComponent {
    @Input() value: any;
    @Output() valueChange = new EventEmitter<any>();

    @Input() label: string = 'Mensaje';
    @Input() placeholder: string = '';
    @Input() rows: number = 4;

    // Método para manejar el evento de input
    onInputChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.valueChange.emit(input.value);
    }
}
