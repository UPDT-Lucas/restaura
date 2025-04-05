import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
    selector: 'shared-multiselect',
    standalone: true,
    imports: [NgSelectModule, FormsModule],
    templateUrl: './multiselect.component.html',
    styleUrls: ['./multiselect.component.css'],
})
export class MultiselectComponent {
    @Input() label: string = '';
    @Input() options: { value: string; label: string }[] = [];
    @Input() multiple: boolean = false;

    selectedValues: string[] = []; // o number[] si tus values son numéricos
}
