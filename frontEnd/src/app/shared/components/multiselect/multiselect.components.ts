import { Component, Input, Output, EventEmitter } from '@angular/core';
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
    @Input() options: { value: any; label: string }[] = [];
    @Input() multiple: boolean = false;

    @Input() value: any[] = [];
    @Output() valueChange = new EventEmitter<any[]>();

    onChange(newValues: any[]) {
        this.valueChange.emit(newValues);
    }
}
