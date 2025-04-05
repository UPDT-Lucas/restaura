import { Component, Input } from '@angular/core';

@Component({
    selector: 'shared-input-text-area',
    templateUrl: './input-text-area.component.html',
    styleUrls: ['./input-text-area.component.css'],
    standalone: true,
})
export class InputTextAreaComponent {
    @Input() label: string = 'Mensaje';
    @Input() placeholder: string = '';
    @Input() rows: number = 4;
}
