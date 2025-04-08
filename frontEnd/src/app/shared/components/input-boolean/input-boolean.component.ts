import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'shared-input-boolean',
    templateUrl: './input-boolean.component.html',
    styleUrls: ['./input-boolean.component.css'],
    standalone: true,
})
export class InputBooleanComponent {
    @Input() label: string = '';
    @Input() value: boolean | null = null;
    @Output() valueChange = new EventEmitter<boolean>();

    toggle(newValue: boolean) {
        this.valueChange.emit(newValue);
    }
}
