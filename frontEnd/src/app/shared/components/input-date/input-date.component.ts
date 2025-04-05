import { Component, Input } from '@angular/core';

@Component({
    selector: 'shared-input-date',
    templateUrl: './input-date.component.html',
    styleUrls: ['./input-date.component.css'],
    standalone: true,
})
export class InputDateComponent {
    @Input() label: string = 'Fecha';
    @Input() placeholder: string = '';
}
