import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'shared-input-range',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './input-range.component.html',
    styleUrls: ['./input-range.component.css'],
})
export class InputRangeComponent {
    @Input() desde: number | null = null;
    @Input() hasta: number | null = null;

    @Input() labelDesde: string = 'Desde';
    @Input() labelHasta: string = 'Hasta';
    @Input() placeholderDesde: string = '';
    @Input() placeholderHasta: string = '';
    @Input() error: string = 'Rango inválido';

    @Output() rangeChange = new EventEmitter<{ desde: number | null; hasta: number | null }>();

    touched: boolean = false;

    onInputChange(): void {
        this.touched = true;
        this.rangeChange.emit({ desde: this.desde, hasta: this.hasta });
    }

    get showError(): boolean {
        return this.touched && (this.desde === null || this.hasta === null || this.desde > this.hasta);
    }
}
