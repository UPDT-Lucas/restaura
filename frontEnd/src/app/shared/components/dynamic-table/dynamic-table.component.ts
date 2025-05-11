import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';


@Component({
    selector: 'shared-dynamic-table',
    standalone: true,
    imports: [CommonModule, RouterModule, ButtonComponent],
    templateUrl: './dynamic-table.component.html',
    styleUrls: ['./dynamic-table.component.css'],
})
export class DynamicTableComponent {
    @Input() tableData: string[][] = [];
    @Input() editLink: string = '';

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
}
