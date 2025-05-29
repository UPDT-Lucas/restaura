import { Component, ViewChild } from '@angular/core';
import { TitleOneComponent } from '../../../shared/components/title/title.component';
import { InputTextComponent } from '../../../shared/components/input-text/input-text.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { SnackbarComponent } from '../../../shared/components/snackbar/snackbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CuartosService } from '../../../services/cuartos.service';
import { InputBooleanComponent } from '../../../shared/components/input-boolean/input-boolean.component';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
import { firstValueFrom } from 'rxjs';
import { LinkStackService } from '../../../services/link-stack.service';

@Component({
    selector: 'table-example',
    standalone: true,
    imports: [
        CommonModule,
        TitleOneComponent,
        InputTextComponent,
        ButtonComponent,
        ConfirmDialogComponent,
        SnackbarComponent,
        InputBooleanComponent,
        SelectComponent,
        DynamicTableComponent,
    ],
    templateUrl: './edit-cuarto.component.html',
    styleUrls: ['./edit-cuarto.component.css'],
})
export class EditCuartoComponent {
    constructor(
        private cuartosService: CuartosService,
        private route: ActivatedRoute,
        private router: Router,
        private linkStack: LinkStackService,
    ) {}

    cargando: boolean = true;
    tipoCuartoOptions: { label: string; value: string }[] = [];
    esCuartoCreado = false;
    currentPage = 1;
    limitPerPage = 5;
    totalItems = 0;
    selectedIdCamas: string = '0';
    camas: any[] = [];
    headers = [['Id', 'Nombre', 'Tipo Cuarto', 'Activo']];
    tableData: any[] = this.headers;
    showEditModal = false;
    showDeleteModal = false;

    formData: any = {
        nombre: null,
        tipo_cuarto_id: null,
        active: null,
        idCuarto: null,
    };

    ngAfterViewInit(): void {
        this.route.queryParamMap.subscribe((params) => {
            const typeMessage = params.get('type-response');

            if (typeMessage === '1') {
                this.snackbar.show('Cama creada correctamente', 3000);
            } else if (typeMessage === '2') {
                this.snackbar.show('Cama editada correctamente', 3000);
            } else if (typeMessage === '3') {
                this.snackbar.show('Cama eliminada correctamente', 3000);
            }

            if (['1', '2', '3'].includes(typeMessage || '')) {
                setTimeout(() => {
                    this.router.navigate([], {
                        relativeTo: this.route,
                        queryParams: {},
                        replaceUrl: true,
                        skipLocationChange: true,
                    });
                    
                    setTimeout(() => {
                        this.linkStack.popLink();
                    }, 50);
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
            const idCuarto = this.route.snapshot.paramMap.get('id') || '0';
            this.formData.idCuarto = idCuarto;

            // Obtener tipos de cuartos
            const tiposCuartosResp = await firstValueFrom(this.cuartosService.getTiposCuartos());
            this.tipoCuartoOptions = tiposCuartosResp.tiposCuartos.map((item: any) => ({
                label: item.nombre,
                value: item.id.toString(),
            }));

            // Obtener datos del cuarto
            const cuartoResp = await firstValueFrom(this.cuartosService.getCuarto(idCuarto));
            if (cuartoResp.status === 200) {
                this.formData.nombre = cuartoResp.data.nombre.toString();
                this.formData.tipo_cuarto_id = cuartoResp.data.tipo_cuarto_id.toString();
                this.formData.active = cuartoResp.data.active;

                this.esCuartoCreado = true;
            } else {
                console.error('Error al obtener el cuarto:', cuartoResp);
            }

            // Obtener camas y enriquecer con tipo_cama
            const camasResp = await firstValueFrom(this.cuartosService.getCamasByIdCuarto(idCuarto));
            if (camasResp.status === 200) {
                this.camas = await Promise.all(
                    camasResp.data.map(async (item: any) => {
                        try {
                            const tipoCamaResp = await firstValueFrom(
                                this.cuartosService.getTipoCama(item.tipo_cama_id),
                            );
                            const tipoCama =
                                tipoCamaResp.status === 200
                                    ? [tipoCamaResp.tipoCama.nombre, tipoCamaResp.tipoCama.color]
                                    : ['Desconocido', '#cccccc'];

                            return [item.id, item.nombre, tipoCama, item.active ? 'Sí' : 'No'];
                        } catch (error) {
                            console.error('Error al obtener tipo de cama:', error);
                            return [item.nombre, ['Error', '#ff0000'], item.active ? 'Sí' : 'No', item.id];
                        }
                    }),
                );

                this.actualizarTabla();
                this.getTotalItems();
            } else {
                console.error('Error al obtener las camas:', camasResp);
            }
        } catch (error) {
            console.error('Error general al recargar la página:', error);
        } finally {
            this.cargando = false;
        }
    }

    confirmUpdate() {
        this.showEditModal = true;
    }

    resetForm() {
        this.formData = {
            nombre: null,
            tipo_cuarto_id: null,
            active: null,
            idCuarto: null,
        };
    }

    getTotalItems() {
        this.totalItems = this.camas.length > 1 ? this.camas.length : 0;
    }

    actualizarTabla() {
        const start = (this.currentPage - 1) * this.limitPerPage;
        const end = start + this.limitPerPage;
        const paginados = this.camas.slice(start, end);

        this.tableData = [...this.headers, ...paginados];
    }

    onDeleteRow(id: string) {
        this.selectedIdCamas = id;
        this.showDeleteModal = true;
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

    @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;
    editarCuarto(confirmed: boolean): void {
        this.showEditModal = false;
        if (confirmed) {
            this.cargando = true;

            this.cuartosService
                .editCuarto({
                    nombre: this.formData.nombre,
                    tipo_cuarto_id: this.formData.tipo_cuarto_id,
                    active: this.formData.active,
                    id: this.route.snapshot.paramMap.get('id') || '0',
                })
                .subscribe({
                    next: (response) => {
                        this.cargando = false;

                        if (response.status === 200) {
                            this.linkStack.popLink();

                            const previousUrl = this.linkStack.popLink();

                            if (previousUrl) {
                                const urlParts = previousUrl.split('?');
                                const routePath = urlParts[0];

                                this.router.navigate([routePath], { queryParams: { 'type-response': '2' } });
                            } else {
                                this.router.navigate(['/']);
                            }
                        } else {
                            console.error('Error al guardar Cuarto:', response);
                            this.snackbar.show('Error al guardar Cuarto', 3000);
                        }
                    },
                    error: (error) => {
                        this.cargando = false;
                        console.error('Error al guardar Cuarto:', error);
                        this.snackbar.show('Error al guardar Cuarto', 3000);
                    },
                });
        }
    }

    eliminarCama(confirmed: boolean): void {
        this.showDeleteModal = false;
        if (confirmed) {
            this.cargando = true;

            this.cuartosService.deleteCama(this.selectedIdCamas).subscribe({
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
                        console.error('Error al eliminar la cama:', response);
                        this.snackbar.show('Error al eliminar la cama', 3000);
                    }
                },
                error: (error) => {
                    this.cargando = false;
                    console.error('Error al eliminar la cama:', error);
                    this.snackbar.show('Error al eliminar la cama', 3000);
                },
            });
        }
    }
}
