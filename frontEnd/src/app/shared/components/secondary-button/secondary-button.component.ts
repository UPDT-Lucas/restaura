import { Component, Input } from '@angular/core';

@Component({
    selector: 'shared-secondary-button',
    imports: [],
    templateUrl: './secondary-button.component.html',
    styleUrl: './secondary-button.component.css',
})
export class SecondaryButtonComponent {
    @Input() text: string = '';
}
