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
    templateUrl: './cantones.component.html',
    styleUrls: ['./cantones.component.css'],
})
export class CantonesComponent {
    @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;
    constructor(
        private collectionsService: CollectionsService,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    /* Variables */
    cargando: boolean = true;
    showModal: boolean = false;

    headers = [['Id', 'Nombre', 'Provincia']];
    cantones: any[] = [];
    provincias: any[] = [];
    tableData = this.headers;
    currentPage = 1;
    limitPerPage = 5;
    totalItems = 0;
    selectedIdCanton: string = '0';

    ngAfterViewInit(): void {
        this.route.queryParamMap.subscribe((params) => {
            const typeMessage = params.get('type-response');

            if (typeMessage === '1') {
                this.snackbar.show('Cantón creado correctamente', 3000);
            } else if (typeMessage === '2') {
                this.snackbar.show('Cantón editado correctamente', 3000);
            } else if (typeMessage === '3') {
                this.snackbar.show('Cantón eliminado correctamente', 3000);
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
        });
    }

    ngOnInit(): void {
        this.collectionsService.getCatalogos().subscribe({
            next: (data) => {
                this.provincias = data.provincia;

                this.cantones = data.canton.map((canton: any) => {
                    const provincia = this.provincias.find((p: any) => p.id === canton.provincia_id);

                    const nombreProvincia = provincia ? provincia.nombre : 'Desconocida';

                    return [String(canton.id), canton.nombre, nombreProvincia];
                });

                this.getTotalItems(); // Obtener el total de elementos
                this.actualizarTabla(); // Mostrar la primera página
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

    eliminarCanton(confirmed: boolean): void {
        this.showModal = false;
        if (confirmed) {
            this.cargando = true;

            this.collectionsService.deleteCanton(this.selectedIdCanton).subscribe({
                next: (response) => {
                    this.cargando = false;

                    if (response.status === 200) {
                        this.router.navigate(['/cantones'], {
                             queryParams: { 'type-response': '3' },
                        });
                    } else {
                        console.error('Error al eliminar el cantón:', response);
                        this.snackbar.show('Error al eliminar el cantón', 3000);
                    }
                },
                error: (error) => {
                    console.error('Error al eliminar el canton:', error);
                    this.snackbar.show('Error al eliminar el cantón', 3000);
                },
            });
        }
    }

    getTotalItems() {
        this.totalItems = this.cantones.length > 1 ? this.cantones.length : 0;
    }

    actualizarTabla() {
        const start = (this.currentPage - 1) * this.limitPerPage;
        const end = start + this.limitPerPage;
        const cantonesPaginados = this.cantones.slice(start, end);

        this.tableData = [...this.headers, ...cantonesPaginados];
    }

    onDeleteRow(id: string) {
        this.selectedIdCanton = id;
        this.confirmUpdate();
    }

    onUpdatePage(page: number) {
        this.currentPage = page;
        this.actualizarTabla();
    }

    onUpdateLimit(limit: number) {
        console.log('Actualizar límite por página:', limit);
        this.limitPerPage = limit;
        this.currentPage = 1;
        this.actualizarTabla();
    }
}
