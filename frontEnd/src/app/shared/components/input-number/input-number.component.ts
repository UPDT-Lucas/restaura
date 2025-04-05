import { Component, Input } from '@angular/core';

@Component({
    selector: 'shared-input-number',
    templateUrl: './input-number.component.html',
    styleUrls: ['./input-number.component.css'],
})
export class InputNumberComponent {
    @Input() label: string = '';
    @Input() placeholder: string = '';
}
