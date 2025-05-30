import { Component, ViewChild } from '@angular/core';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { SnackbarComponent } from '../../../shared/components/snackbar/snackbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CuartosService } from '../../../services/cuartos.service';
import { LinkStackService } from '../../../services/link-stack.service';

@Component({
    selector: 'table-example',
    imports: [DynamicTableComponent, CommonModule, ConfirmDialogComponent, SnackbarComponent],
    templateUrl: './tipos-cuartos.component.html',
    styleUrls: ['./tipos-cuartos.component.css'],
})
export class TipoCuartosComponent {
    @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;
    constructor(
        private cuartosService: CuartosService,
        private route: ActivatedRoute,
        private router: Router,
        private linkStack: LinkStackService,
    ) {}

    /* Variables */
    cargando: boolean = true;
    showModal: boolean = false;

    headers = [['Id', 'Nombre']];
    tipoCuartos: any[] = [];
    tableData = this.headers;
    currentPage = 1;
    limitPerPage = 5;
    totalItems = 0;
    selectedIdTipoCuarto: string = '0';

    ngAfterViewInit(): void {
        this.route.queryParamMap.subscribe((params) => {
            const typeMessage = params.get('type-response');

            if (typeMessage === '1') {
                this.snackbar.show('Tipo Cuarto creado correctamente', 3000);
            } else if (typeMessage === '2') {
                this.snackbar.show('Tipo Cuarto editado correctamente', 3000);
            } else if (typeMessage === '3') {
                this.snackbar.show('Tipo Cuarto eliminado correctamente', 3000);
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
        this.cargando = true;

        this.cuartosService.getTiposCuartos().subscribe({
            next: (data) => {
                this.tipoCuartos = data.tiposCuartos.map((item: any) => [item.id, [item.nombre, item.color]]);

                this.getTotalItems();
                this.actualizarTabla();
                this.cargando = false;
            },
            error: (error) => {
                this.cargando = false;
                console.error('Error al obtener los tipos cuartos:', error);
                this.snackbar.show('Error al cargar los tipos cuartos', 3000);
            },
        });
    }

    confirmUpdate() {
        this.showModal = true;
    }

    eliminarTipoCuarto(confirmed: boolean): void {
        this.showModal = false;
        if (confirmed) {
            this.cargando = true;

            this.cuartosService.deleteTipoCuarto(this.selectedIdTipoCuarto).subscribe({
                next: (response) => {
                    this.cargando = false;

                    if (response.status === 200) {
                        const previousUrl = this.linkStack.popLink();

                        if (previousUrl) {
                            const urlParts = previousUrl.split('?');
                            const routePath = urlParts[0];

                            this.router.navigate([routePath], { queryParams: { 'type-response': '3' } });
                        } else {
                            this.router.navigate(['/']);
                        }
                    } else {
                        console.error('Error al eliminar el Tipo Cuarto:', response);
                        this.snackbar.show('Error al eliminar el Tipo Cuarto', 3000);
                    }
                },
                error: (error) => {
                    this.cargando = false;
                    console.error('Error al eliminar el Tipo Cuarto:', error);
                    this.snackbar.show('Error al eliminar el Tipo Cuarto', 3000);
                },
            });
        }
    }

    getTotalItems() {
        this.totalItems = this.tipoCuartos.length > 1 ? this.tipoCuartos.length : 0;
    }

    actualizarTabla() {
        const start = (this.currentPage - 1) * this.limitPerPage;
        const end = start + this.limitPerPage;
        const tiposCuartosPaginados = this.tipoCuartos.slice(start, end);

        this.tableData = [...this.headers, ...tiposCuartosPaginados];
    }

    onDeleteRow(id: string) {
        this.selectedIdTipoCuarto = id;
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
