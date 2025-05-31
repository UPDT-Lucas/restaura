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
    templateUrl: './tipos-camas.component.html',
    styleUrls: ['./tipos-camas.component.css'],
})
export class TiposCamasComponent {
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
    tipoCamas: any[] = [];
    tableData = this.headers;
    currentPage = 1;
    limitPerPage = 5;
    totalItems = 0;
    selectedIdTipoCama: string = '0';

    ngAfterViewInit(): void {
        this.route.queryParamMap.subscribe((params) => {
            const typeMessage = params.get('type-response');

            if (typeMessage === '1') {
                this.snackbar.show('Tipo Cama creado correctamente', 3000);
            } else if (typeMessage === '2') {
                this.snackbar.show('Tipo Cama editado correctamente', 3000);
            } else if (typeMessage === '3') {
                this.snackbar.show('Tipo Cama eliminado correctamente', 3000);
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

        this.cuartosService.getTiposCamas().subscribe({
            next: (data) => {
                this.tipoCamas = data.tiposCamas.map((item: any) => [item.id, [item.nombre, item.color]]);

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

    eliminarTipoCama(confirmed: boolean): void {
        this.showModal = false;
        if (confirmed) {
            this.cargando = true;

            this.cuartosService.deleteTipoCama(this.selectedIdTipoCama).subscribe({
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
                        console.error('Error al eliminar el Tipo Cama:', response);
                        this.snackbar.show('Error al eliminar el Tipo Cama', 3000);
                    }
                },
                error: (error) => {
                    this.cargando = false;
                    console.error('Error al eliminar el Tipo Cama:', error);
                    this.snackbar.show('Error al eliminar el Tipo Cama', 3000);
                },
            });
        }
    }

    getTotalItems() {
        this.totalItems = this.tipoCamas.length > 1 ? this.tipoCamas.length : 0;
    }

    actualizarTabla() {
        const start = (this.currentPage - 1) * this.limitPerPage;
        const end = start + this.limitPerPage;
        const tiposCuartosPaginados = this.tipoCamas.slice(start, end);

        this.tableData = [...this.headers, ...tiposCuartosPaginados];
    }

    onDeleteRow(id: string) {
        this.selectedIdTipoCama = id;
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
