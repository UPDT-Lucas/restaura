import { Component, ViewChild } from '@angular/core';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
import { CollectionsService } from '../../../services/collections.service';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { SnackbarComponent } from '../../../shared/components/snackbar/snackbar.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'table-example',
    imports: [DynamicTableComponent, CommonModule, ConfirmDialogComponent, SnackbarComponent],
    templateUrl: './tipos-ayuda.component.html',
    styleUrls: ['./tipos-ayuda.component.css'],
})
export class TiposAyudaComponent {
    @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;
    constructor(
        private collectionsService: CollectionsService,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    cargando: boolean = true;
    showModal: boolean = false;

    headers = [['Id', 'Nombre']];
    tiposAyuda: any[] = [];
    tableData = this.headers;
    currentPage = 1;
    limitPerPage = 5;
    totalItems = 0;
    selectedIdTiposAyuda: string = '0';

    ngAfterViewInit(): void {
        this.route.queryParamMap.subscribe((params) => {
            const typeMessage = params.get('type-response');

            if (typeMessage === '1') {
                this.snackbar.show('Tipo de ayuda creado correctamente', 3000);
            } else if (typeMessage === '2') {
                this.snackbar.show('Tipo de ayuda editado correctamente', 3000);
            } else if (typeMessage === '3') {
                this.snackbar.show('Tipo de ayuda eliminado correctamente', 3000);
            }

            if (['1', '2', '3'].includes(typeMessage || '')) {
                setTimeout(() => {
                    this.router.navigate([], {
                        relativeTo: this.route,
                        queryParams: {},
                        replaceUrl: true,
                    });
                }, 500);
            }

            this.reloadPage();
            this.currentPage = 1;
        });
    }

    ngOnInit(): void {
        this.reloadPage();
    }

    reloadPage() {
        this.collectionsService.getTiposAyuda().subscribe({
            next: (data) => {
                this.tiposAyuda = data.tiposAyuda.map((tipo: any) => {
                    return [String(tipo.id), tipo.nombre];
                });

                this.getTotalItems();
                this.actualizarTabla();
                this.cargando = false;
            },
            error: (error) => {
                console.error('Error al obtener los catalogos:', error);
            },
        });
    }

    confirmUpdate() {
        this.showModal = true;
    }

    eliminarTiposAyuda(confirmed: boolean): void {
        this.showModal = false;
        if (confirmed) {
            this.cargando = true;

            this.collectionsService.deleteTiposAyuda(this.selectedIdTiposAyuda).subscribe({
                next: (response) => {
                    this.cargando = false;

                    if (response.status === 200) {
                        this.router.navigate(['/tipos-ayuda'], {
                            queryParams: { 'type-response': '3' },
                        });
                    } else {
                        console.error('Error al eliminar el tipo de ayuda:', response);
                        this.snackbar.show('Error al eliminar el tipo de ayuda', 3000);
                    }
                },
                error: (error) => {
                    console.error('Error al eliminar el tipo de ayuda:', error);
                    this.snackbar.show('Error al eliminar el tipo de ayuda', 3000);
                },
            });
        }
    }

    getTotalItems() {
        this.totalItems = this.tiposAyuda.length > 1 ? this.tiposAyuda.length : 0;
    }

    actualizarTabla() {
        const start = (this.currentPage - 1) * this.limitPerPage;
        const end = start + this.limitPerPage;
        const paginados = this.tiposAyuda.slice(start, end);

        this.tableData = [...this.headers, ...paginados];
    }

    onDeleteRow(id: string) {
        this.selectedIdTiposAyuda = id;
        this.confirmUpdate();
    }

    onUpdatePage(page: number) {
        this.currentPage = page;
        this.actualizarTabla();
    }

    onUpdateLimit(limit: number) {
        this.limitPerPage = limit;
        this.currentPage = 1;
        this.actualizarTabla();
    }
}
