import { Component, Input } from '@angular/core';

@Component({
    selector: 'shared-input-text',
    templateUrl: './input-text.component.html',
    styleUrls: ['./input-text.component.css'],
})
export class InputTextComponent {
    @Input() label: string = '';
    @Input() placeholder: string = '';
    @Input() disabled: boolean = false;
}
