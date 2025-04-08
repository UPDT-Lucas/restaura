import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'shared-input-text',
    imports: [CommonModule],
    templateUrl: './input-text.component.html',
    styleUrls: ['./input-text.component.css'],
})
export class InputTextComponent {
    @Input() value: any;
    @Output() valueChange = new EventEmitter<any>();
    @Input() label: string = '';
    @Input() placeholder: string = '';
    @Input() disabled: boolean = false;
    @Input() error: string = '';
    touched: boolean = false;

    // Método para manejar el evento de input
    onInputChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        
        // Marcar como tocado
        if (!this.touched) {
            this.touched = true;
        }
        
        const value = input.value === '' ? null : input.value;
        this.valueChange.emit(value);
    }
}
