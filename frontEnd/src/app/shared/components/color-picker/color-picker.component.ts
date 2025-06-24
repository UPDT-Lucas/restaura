import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'shared-color-picker',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './color-picker.component.html',
    styleUrls: ['./color-picker.component.css'],
})
export class ColorPickerComponent {
    @Input() value: string | null = '#000000';
    @Output() valueChange = new EventEmitter<string>();
    @Output() blurChange = new EventEmitter<string>();
    @Input() label: string = '';
    @Input() placeholder: string = '';
    @Input() disabled: boolean = false;
    @Input() error: string = '';
    touched: boolean = false;

    onInputChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.value = input.value;
        this.valueChange.emit(this.value);
    }

    onBlur(): void {
        this.touched = true;
        if (this.value) {
            this.blurChange.emit(this.value);
        }
    }
}
