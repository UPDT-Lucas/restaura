import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'shared-dynamic-table',
    standalone: true,
    imports: [CommonModule, RouterModule, ButtonComponent, FormsModule],
    templateUrl: './dynamic-table.component.html',
    styleUrls: ['./dynamic-table.component.css'],
})
export class DynamicTableComponent {
    @Input() tableData: string[][] = [];
    @Input() editLink: string = '';
    @Input() viewLink: string = '';
    @Input() deleteButton: boolean = false;
    @Input() selectable: boolean = false;

    @Input() limitPerPage: number = 10;
    @Input() currentPage: number = 1;
    @Input() totalItems: number = 32;
    @Input() buttonText: string = 'Nuevo Cantón';
    @Input() table_title: string = 'Cantones';
    @Input() buttonLink: string = '';
    @Input() showButton: boolean = true;

    @Output() deleteRow = new EventEmitter<string>();
    @Output() updatePage = new EventEmitter<number>();
    @Output() changeLimit = new EventEmitter<number>();
    @Output() selectedIdChange = new EventEmitter<string | null>();

    selectedId: any = null;

    get rangeText(): string {
        if (this.totalItems === 0) {
            return 'No hay registros para mostrar.';
        }

        const start = (this.currentPage - 1) * this.limitPerPage + 1;
        let end = this.currentPage * this.limitPerPage;
        if (end > this.totalItems) {
            end = this.totalItems;
        }

        return `Mostrando del ${start} al ${end} de un total de ${this.totalItems} registros.`;
    }

    get totalPages(): number {
        return Math.ceil(this.totalItems / this.limitPerPage);
    }

    get header(): string[] {
        return this.tableData.length ? this.tableData[0] : [];
    }

    get rows(): string[][] {
        return this.tableData.slice(1);
    }

    get pages(): (number | string)[] {
        const pages: (number | string)[] = [];
        const total = this.totalPages;

        if (total <= 7) {
            for (let i = 1; i <= total; i++) {
                pages.push(i);
            }
        } else {
            if (this.currentPage <= 4) {
                for (let i = 1; i <= 5; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(total);
            } else if (this.currentPage >= total - 3) {
                pages.push(1);
                pages.push('...');
                for (let i = total - 4; i <= total; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                pages.push(this.currentPage - 1);
                pages.push(this.currentPage);
                pages.push(this.currentPage + 1);
                pages.push('...');
                pages.push(total);
            }
        }

        return pages;
    }

    handleDelete(id: string): void {
        this.deleteRow.emit(id);
    }

    changePage(page: number): void {
        if (page >= 1 && page <= this.totalPages) {
            this.updatePage.emit(page);
        }
    }

    onLimitChange(event: Event) {
        const target = event.target as HTMLSelectElement;
        const newLimit = Number(target.value);
        this.changeLimit.emit(newLimit);
    }

    isNumber(value: any): boolean {
        return typeof value === 'number';
    }

    goToPage(page: any): void {
        if (typeof page === 'number') {
            this.changePage(page);
        }
    }

    onCheckboxChange(row: any): void {
        const id = row[0];

        if (this.selectedId === id) {
            this.selectedId = null;
            this.selectedIdChange.emit(null);
        } else {
            this.selectedId = id;
            this.selectedIdChange.emit(id);
        }

        console.log('Seleccionado:', this.selectedId);
    }

    isBadge(cell: any): boolean {
        return Array.isArray(cell) && cell.length === 2 && typeof cell[1] === 'string' && cell[1].startsWith('#');
    }

getTextColor(bgColor: string): string {
    const hex = bgColor.replace('#', '').toLowerCase();

    // Si es negro puro, devolver blanco
    if (hex === '000000') {
        return '#ffffff';
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const factor = 0.4;
    const darken = (value: number) => Math.max(0, Math.floor(value * factor));
    const toHex = (n: number) => n.toString(16).padStart(2, '0');

    const newR = darken(r);
    const newG = darken(g);
    const newB = darken(b);

    return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
}





}
