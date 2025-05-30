import { Component, ViewChild } from '@angular/core';
import { TitleOneComponent } from '../../../shared/components/title/title.component';
import { InputTextComponent } from '../../../shared/components/input-text/input-text.component';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { SnackbarComponent } from '../../../shared/components/snackbar/snackbar.component';
import { CuartosService } from '../../../services/cuartos.service';
import { InputBooleanComponent } from '../../../shared/components/input-boolean/input-boolean.component';
import { LinkStackService } from '../../../services/link-stack.service';
import { Router } from '@angular/router';

@Component({
    selector: 'table-example',
    imports: [
        CommonModule,
        TitleOneComponent,
        InputTextComponent,
        SelectComponent,
        ButtonComponent,
        ConfirmDialogComponent,
        SnackbarComponent,
        InputBooleanComponent,
    ],
    templateUrl: './add-cuarto.component.html',
    styleUrls: ['./add-cuarto.component.css'],
})
export class addCuartoComponent {
    constructor(private cuartosService: CuartosService, private linkStack: LinkStackService, private router: Router) {}

    cargando: boolean = false;
    showModal: boolean = false;
    tipoCuartoOptions: { label: string; value: string }[] = [];
    esCuartoCreado = false;
    tableData: any[] = [];
    currentPage = 1;
    limitPerPage = 5;
    totalItems = 0;
    selectedIdCamas: string = '0';
    camas: any[] = [];
    headers = [['Nombre', 'Tipo Cuarto', 'Activo']];

    formData: any = {
        nombre: null,
        tipo_cuarto_id: null,
        active: null,
    };

    ngOnInit(): void {
        this.cuartosService.getTiposCuartos().subscribe({
            next: (data) => {
                this.tipoCuartoOptions = data.tiposCuartos.map((item: any) => ({
                    label: item.nombre,
                    value: item.id.toString(),
                }));

                this.cargando = false;
            },
            error: (error) => {
                this.cargando = false;
                console.error('Error al obtener los tipos cuartos:', error);
            },
        });
    }

    confirmUpdate() {
        this.showModal = true;
    }

    resetForm() {
        this.formData = {
            nombre: null,
            tipo_cuarto_id: null,
            active: null,
        };
    }

    actualizarTabla() {
        const start = (this.currentPage - 1) * this.limitPerPage;
        const end = start + this.limitPerPage;
        const paginados = this.camas.slice(start, end);

        this.tableData = [...this.headers, ...paginados];
    }

    onDeleteRow(id: string) {
        this.selectedIdCamas = id;
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

    @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;
    crearCuarto(confirmed: boolean): void {
        this.showModal = false;
        if (confirmed) {
            this.cargando = true;

            this.cuartosService.addCuarto(this.formData).subscribe({
                next: (response) => {
                    if (response.status === 200) {
                        this.linkStack.popLink();
                        
                        const previousUrl = this.linkStack.popLink();

                        if (previousUrl) {
                            const urlParts = previousUrl.split('?');
                            const routePath = urlParts[0];

                            this.router.navigate([routePath], { queryParams: { 'type-response': '1' } });
                        } else {
                            this.router.navigate(['/']);
                        }
                    } else {
                        console.error('Error al guardar el cuarto:', response);
                        this.snackbar.show('Error al guardar el cuarto', 3000);
                    }
                    this.cargando = false;
                },
                error: (error) => {
                    console.error('Error al guardar el cuarto:', error);
                    this.snackbar.show('Error al guardar el cuarto', 3000);
                    this.cargando = false;
                },
            });
        }
    }
}
