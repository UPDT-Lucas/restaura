import { Component, ViewChild } from '@angular/core';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
import { CollectionsService } from '../../../services/collections.service';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { SnackbarComponent } from '../../../shared/components/snackbar/snackbar.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'table-example',
    standalone: true,
    imports: [DynamicTableComponent, CommonModule, ConfirmDialogComponent, SnackbarComponent],
    templateUrl: './generos.component.html',
    styleUrls: ['./generos.component.css'],
})
export class GeneroComponent {
    @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;
    constructor(
        private collectionsService: CollectionsService,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    cargando: boolean = true;
    showModal: boolean = false;

    headers = [['Id', 'Nombre']];
    generos: any[] = [];
    tableData = this.headers;
    currentPage = 1;
    limitPerPage = 5;
    totalItems = 0;
    selectedIdGenero: string = '0';

    ngAfterViewInit(): void {
        this.route.queryParamMap.subscribe((params) => {
            const typeMessage = params.get('type-response');

            if (typeMessage === '1') {
                this.snackbar.show('Género creado correctamente', 3000);
            } else if (typeMessage === '2') {
                this.snackbar.show('Género editado correctamente', 3000);
            } else if (typeMessage === '3') {
                this.snackbar.show('Género eliminado correctamente', 3000);
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
        this.collectionsService.getGeneros().subscribe({
            next: (data) => {
                this.generos = data.generos.map((item: any) => {
                    return [String(item.id), item.nombre];
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

    eliminarGenero(confirmed: boolean): void {
        this.showModal = false;
        if (confirmed) {
            this.cargando = true;

            this.collectionsService.deleteGenero(this.selectedIdGenero).subscribe({
                next: (response) => {
                    this.cargando = false;

                    if (response.status === 200) {
                        this.router.navigate(['/generos'], {
                            queryParams: { 'type-response': '3' },
                        });
                    } else {
                        console.error('Error al eliminar el género:', response);
                        this.snackbar.show('Error al eliminar el género', 3000);
                    }
                },
                error: (error) => {
                    console.error('Error al eliminar el género:', error);
                    this.snackbar.show('Error al eliminar el género', 3000);
                },
            });
        }
    }

    getTotalItems() {
        this.totalItems = this.generos.length > 1 ? this.generos.length : 0;
    }

    actualizarTabla() {
        const start = (this.currentPage - 1) * this.limitPerPage;
        const end = start + this.limitPerPage;
        const paginados = this.generos.slice(start, end);

        this.tableData = [...this.headers, ...paginados];
    }

    onDeleteRow(id: string) {
        this.selectedIdGenero = id;
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
