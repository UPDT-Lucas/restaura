import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
    selector: 'shared-select',
    imports: [NgFor],
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.css'],
    standalone: true,
})
export class SelectComponent {
    @Input() label: string = '';
    @Input() options: { value: string; label: string }[] = [];
}
