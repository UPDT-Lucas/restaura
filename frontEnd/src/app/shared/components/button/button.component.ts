import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'shared-button',
    standalone: true,
    templateUrl: './button.component.html',
    styleUrl: './button.component.css',
})
export class ButtonComponent {
    @Input() text: string = '';
    @Output() buttonClick = new EventEmitter<void>();
}
