import { Component, Output,Input, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'shared-file-export-modal',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './file-export-modal.component.html',
    styleUrls: ['./file-export-modal.component.css'],
})
export class FileExportModalComponent {
    selectedFormat: 'csv' | 'pdf' = 'csv';

    @Input() disablePdf: boolean = false;
    @Output() export = new EventEmitter<'csv' | 'pdf'>();
    @Output() close = new EventEmitter<void>();

    emitExport() {
        this.export.emit(this.selectedFormat);
    }
}
