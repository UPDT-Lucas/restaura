import { Component, ViewChild } from '@angular/core';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
import { CuartosService } from '../../../services/cuartos.service';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { SnackbarComponent } from '../../../shared/components/snackbar/snackbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'table-example',
    imports: [DynamicTableComponent, CommonModule, ConfirmDialogComponent, SnackbarComponent],
    templateUrl: './index-cuarto.component.html',
    styleUrls: ['./index-cuarto.component.css'],
})
export class CuartosComponent {
    @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;
    constructor(private cuartosService: CuartosService, private route: ActivatedRoute, private router: Router) {}

    cargando: boolean = true;
    showModal: boolean = false;

    headers = [['Id', 'Nombre', 'Tipo Cuarto', 'Activo']];
    cuartos: any[] = [];
    tableData = this.headers;
    currentPage = 1;
    limitPerPage = 5;
    totalItems = 0;
    selectedIdCuartos: string = '0';

    ngAfterViewInit(): void {
        this.route.queryParamMap.subscribe((params) => {
            const typeMessage = params.get('type-response');

            if (typeMessage === '1') {
                this.snackbar.show('Cuarto creado correctamente', 3000);
            } else if (typeMessage === '2') {
                this.snackbar.show('Cuarto editado correctamente', 3000);
            } else if (typeMessage === '3') {
                this.snackbar.show('Cuarto eliminado correctamente', 3000);
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

    async reloadPage() {
        this.cargando = true;
        try {
            const data = await firstValueFrom(this.cuartosService.getCuartos());

            const cuartosConTipo = await Promise.all(
                data.data.map(async (item: any) => {
                    try {
                        const tipoCuartoResp = await firstValueFrom(
                            this.cuartosService.getTipoCuarto(item.tipo_cuarto_id),
                        );

                        const tipoNombre = tipoCuartoResp.status === 200 ? tipoCuartoResp.tipoCuarto : null;

                        if (tipoNombre) {
                            return [String(item.id), item.nombre, [tipoNombre.nombre, tipoNombre.color], item.active ? 'Si' : 'No'];
                        }

                        return [String(item.id), item.nombre, tipoNombre.nombre, item.active === 'true' ? 'Si' : 'No'];
                    } catch (error) {
                        console.error('Error al obtener tipoCuarto', error);
                        return [String(item.id), item.nombre, 'Error', item.active];
                    }
                }),
            );

            this.cuartos = cuartosConTipo;
            this.getTotalItems();
            this.actualizarTabla();
        } catch (error) {
            console.error('Error al obtener los cuartos:', error);
        } finally {
            this.cargando = false;
        }
    }

    confirmUpdate() {
        this.showModal = true;
    }

    eliminarCuarto(confirmed: boolean): void {
        this.showModal = false;
        if (confirmed) {
            this.cargando = true;

            this.cuartosService.deleteCuarto(this.selectedIdCuartos).subscribe({
                next: (response) => {
                    this.cargando = false;

                    if (response.status === 200) {
                        this.router.navigate(['/cuartos'], {
                            queryParams: { 'type-response': '3' },
                        });
                    } else {
                        console.error('Error al eliminar el cuarto:', response);
                        this.snackbar.show('Error al eliminar el cuarto', 3000);
                    }
                },
                error: (error) => {
                    this.cargando = false;
                    console.error('Error al eliminar el cuarto:', error);
                    this.snackbar.show('Error al eliminar el cuarto', 3000);
                },
            });
        }
    }

    getTotalItems() {
        this.totalItems = this.cuartos.length > 1 ? this.cuartos.length : 0;
    }

    actualizarTabla() {
        const start = (this.currentPage - 1) * this.limitPerPage;
        const end = start + this.limitPerPage;
        const paginados = this.cuartos.slice(start, end);

        this.tableData = [...this.headers, ...paginados];
    }

    onDeleteRow(id: string) {
        this.selectedIdCuartos = id;
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
