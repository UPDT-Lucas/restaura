import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
import { TitleOneComponent } from '../../../shared/components/title/title.component';
import { InputDateComponent } from '../../../shared/components/input-date/input-date.component';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { CatalogoService } from '../../../services/catalogo.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { SecondaryButtonComponent } from '../../../shared/components/secondary-button/secondary-button.component';
import { InputBooleanComponent } from '../../../shared/components/input-boolean/input-boolean.component';
import { InputNumberComponent } from '../../../shared/components/input-number/input-number.component';
import { AdminService } from '../../../services/admin.service';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';

@Component({
    selector: 'app-consultas',
    imports: [
        DynamicTableComponent,
        TitleOneComponent,
        InputDateComponent,
        SelectComponent,
        CommonModule,
        ButtonComponent,
        SecondaryButtonComponent,
        InputBooleanComponent,
        InputNumberComponent,
        DialogComponent
    ],
    templateUrl: './consultas.component.html',
    styleUrls: ['./consultas.component.css'],
})
export class ConsultasComponent {
    constructor(private catalogoService: CatalogoService, private adminService: AdminService) {}

    // Form Filtros
    formFiltros: any = {
        p_canton_id: null,
        p_fecha_ingreso_desde: null,
        p_fecha_ingreso_hasta: null,
        p_genero_id: null,
        p_edad_desde: null,
        p_edad_hasta: null,
        p_discapacidad: null,
        p_carcel: null,
        p_razon_servicio_id: null,
        p_grado_academico_id: null,
        p_tipo_pension_id: null,
        p_embarazada: null,
    };
    showDialog: boolean = false;
    dialogMessage: string = '';
    headers = [['Identificación', 'Nombre', 'Edad', 'Género', 'Fecha de registro en el sistema']];
    tableData = this.headers;
    consultas: any[] = [];
    totalItems = 0;

    currentPage = 1;
    limitPerPage = 10;
    cargando: boolean = true;
    generoOptions: { label: string; value: string }[] = [];
    razonServicioOptions: { label: string; value: string }[] = [];
    gradoAcademicoOptions: { label: string; value: string }[] = [];
    cantonOptions: { label: string; value: string }[] = [];
    pensionOptions: { label: string; value: string }[] = [];

    ngOnInit() {
        this.catalogoService.getCatalogos().subscribe({
            next: (data) => {
                this.generoOptions = data.genero.map((item: any) => ({
                    label: item.nombre,
                    value: item.id.toString(),
                }));

                this.razonServicioOptions = data.razonServicio.map((item: any) => ({
                    label: item.nombre,
                    value: item.id.toString(),
                }));

                this.gradoAcademicoOptions = data.gradoAcademico.map((item: any) => ({
                    label: item.nombre,
                    value: item.id.toString(),
                }));

                this.cantonOptions = data.canton.map((item: any) => ({
                    label: item.nombre,
                    value: item.id.toString(),
                }));

                this.pensionOptions = data.tipoPension.map((item: any) => ({
                    label: item.nombre,
                    value: item.id.toString(),
                }));

                this.cargando = false;
            },
            error: (error) => {
                console.error('Error al obtener los catálogos:', error);
            },
        });

        this.filter();
    }
    getTotalItems() {
        this.totalItems = this.consultas.length > 1 ? this.consultas.length : 0;
    }

    actualizarTabla() {
        const start = (this.currentPage - 1) * this.limitPerPage;
        const end = start + this.limitPerPage;
        const paginados = this.consultas.slice(start, end);

        this.tableData = [...this.headers, ...paginados];
    }

    onDeleteRow(id: string) {
        console.log('Eliminar registro con ID:', id);
        // Aquí haces la lógica de eliminar en tu servicio
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

    actualizarRango(event: { desde: number | null; hasta: number | null }) {
        console.log('Nuevo rango:', event);
    }

    filter() {
        if(this.formFiltros.p_fecha_ingreso_desde==='') {
            this.formFiltros.p_fecha_ingreso_desde = null;
        }
        if(this.formFiltros.p_fecha_ingreso_hasta==='') {
            this.formFiltros.p_fecha_ingreso_hasta = null;
        }
        if((this.formFiltros.p_fecha_ingreso_desde !== null  && this.formFiltros.p_fecha_ingreso_hasta === null) || (this.formFiltros.p_fecha_ingreso_desde === null && this.formFiltros.p_fecha_ingreso_hasta !== null) ) {
            this.showDialog = true;
            this.dialogMessage = 'Ambas fechas son obligatorias';
            return;
        }
        if(this.formFiltros.p_fecha_ingreso_desde > this.formFiltros.p_fecha_ingreso_hasta) {
            this.showDialog = true;
            this.dialogMessage = 'La fecha de ingreso desde no puede ser mayor a la fecha de ingreso hasta';
            return;

        }
        if((this.formFiltros.p_edad_desde !== null && this.formFiltros.p_edad_hasta === null) || (this.formFiltros.p_edad_desde === null && this.formFiltros.p_edad_hasta !== null)) {
            this.showDialog = true;
            this.dialogMessage = 'Ambas edades son obligatorias';
            return;
        }
        if(this.formFiltros.p_edad_desde > this.formFiltros.p_edad_hasta) {
            this.showDialog = true;
            this.dialogMessage = 'La edad desde no puede ser mayor a la edad hasta';
            return;

        }
        this.cargando = true;
        
        
            this.adminService.consultas(this.formFiltros).subscribe({
                next: (data) => {
                    if (data.status === 200) {
                        this.consultas = data.filters.map((item: any) => [
                            item.id,
                            item.nombre,
                            item.edad,
                            item.genero_nombre,
                            item.fechaingreso,
                        ]);

                        this.getTotalItems();
                        this.actualizarTabla();
                    }
                    this.cargando = false;
                },
                error: (error) => {
                    console.error('Error al filtrar:', error);
                    this.cargando = false;
                },
            });


    }

    clearFilters() {
        this.formFiltros = {
            p_canton_id: null,
            p_fecha_ingreso_desde: null,
            p_fecha_ingreso_hasta: null,
            p_genero_id: null,
            p_edad_desde: null,
            p_edad_hasta: null,
            p_discapacidad: null,
            p_carcel: null,
            p_razon_servicio_id: null,
            p_grado_academico_id: null,
            p_tipo_pension_id: null,
            p_embarazada: null,
        };

        this.filter();
    }
}
