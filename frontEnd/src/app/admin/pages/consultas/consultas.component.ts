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
import { FileExportModalComponent } from '../../../shared/components/modal-file/file-export-modal.component';
import { ReportesService } from '../../../services/reportes.service';

@Component({
    standalone: true,
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
        DialogComponent,
        FileExportModalComponent,
    ],
    templateUrl: './consultas.component.html',
    styleUrls: ['./consultas.component.css'],
})
export class ConsultasComponent {
    constructor(
        private catalogoService: CatalogoService,
        private adminService: AdminService,
        private reportesService: ReportesService,
    ) {}

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
        p_embarazo: null,
    };
    showDialog: boolean = false;
    showModal: boolean = false;
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
    embarazadaOptions: { label: string; value: string }[] = [
        { label: 'Sí', value: 'true' },
        { label: 'No', value: 'false' },
        { label: 'No Aplica', value: 'null' },
    ];

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

    openModal() {
        this.showModal = true;
    }

    onExport(format: 'csv' | 'pdf') {
        if (format === 'csv') {
            this.reportesService.getReporte(this.formFiltros).subscribe({
                next: (data) => {
                    if (data.status === 200) {
                        let dataCsv = [
                            ['SERVICIO DE DORMITORIO.'],
                            ['Total, de días de Dormitorio', data.dataRes.totalDias ?? 0],
                            ['Total, de servicios de dormitorio nocturno', data.dataRes.totalServicios ?? 0],
                            ['Total, de servicios de dormitorio a mujeres', data.dataRes.totalMujeresServicio ?? 0],
                            ['Total, de servicios de dormitorio a hombres', data.dataRes.totalHombresServicio ?? 0],
                            ['Promedio de personas que ingresaron por día', data.dataRes.promxDia ?? 0],
                            ['Promedio de mujeres que ingresaron por día', data.dataRes.promxDiaMujeres ?? 0],
                            ['Promedio de hombres que ingresaron por día', data.dataRes.promxDiaHombres ?? 0],
                            [
                                'Cantidad de personas que ingresaron en el mes contadas una única vez',
                                data.dataRes.personas_distintas ?? 0,
                            ],
                            [
                                'Cantidad de personas que ingresaron en el mes contadas una única vez, mujeres.',
                                data.dataRes.mujeres_distintas ?? 0,
                            ],
                            [
                                'Cantidad de personas que ingresaron en el mes contadas una única vez, hombres',
                                data.dataRes.hombres_distintos ?? 0,
                            ],
                            [
                                'Cantidad de personas que ingresaron por primera vez durante el mes ?',
                                data.dataRes.persona_nuevas ?? 0,
                            ],
                            [
                                'Cantidad de personas nacionales que ingresaron durante el mes',
                                data.dataRes.persona_nacionales ?? 0,
                            ],
                            [
                                'Cantidad de personas extranjeras que ingresaron durante el mes',
                                data.dataRes.persona_extranjeras ?? 0,
                            ],
                            ['Cantidad de mujeres embarazadas', data.dataRes.embarazadas ?? 0],
                            [
                                'Cantidad de adultos mayores que ingresaron en el mes (x>=65)',
                                data.dataRes.adultos_mayores ?? 0,
                            ],
                            [
                                'Cantidad de adultos mayores que ingresaron en el mes hombres',
                                data.dataRes.adultos_mayores_hombres ?? 0,
                            ],
                            [
                                'Cantidad de adultos mayores que ingresaron en el mes mujeres',
                                data.dataRes.adultos_mayores_mujeres ?? 0,
                            ],
                            [
                                'Cantidad de adulto joven que ingresaron en el mes (18 – 35 años)',
                                data.dataRes.adultos_jovenes ?? 0,
                            ],
                            ['Cantidad de adultos que ingresaron en el mes (36- 64 años)', data.dataRes.adultos ?? 0],
                            [
                                'Cantidad de personas con discapacidad que ingresaron en el mes',
                                data.dataRes.discapacitados ?? 0,
                            ],
                        ];

                        this.downloadCSV(dataCsv, 'reporte_servicio_dormitorio.csv');
                    }
                },
                error: (error) => {
                    console.error('Error al generar el reporte:', error);
                    this.showDialog = true;
                    this.dialogMessage = 'Error al generar el reporte';
                },
            });
        }

        this.showModal = false;
    }

    downloadCSV(data: string[][], filename: string) {
        const csvContent = '\uFEFF' + data.map((e) => e.join(';')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        this.triggerDownload(blob, filename);
    }

    triggerDownload(blob: Blob, filename: string) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }

    filter() {
        if (this.formFiltros.p_fecha_ingreso_desde === '') {
            this.formFiltros.p_fecha_ingreso_desde = null;
        }
        if (this.formFiltros.p_fecha_ingreso_hasta === '') {
            this.formFiltros.p_fecha_ingreso_hasta = null;
        }
        if (
            (this.formFiltros.p_fecha_ingreso_desde !== null && this.formFiltros.p_fecha_ingreso_hasta === null) ||
            (this.formFiltros.p_fecha_ingreso_desde === null && this.formFiltros.p_fecha_ingreso_hasta !== null)
        ) {
            this.showDialog = true;
            this.dialogMessage = 'Ambas fechas son obligatorias';
            return;
        }
        if (this.formFiltros.p_fecha_ingreso_desde > this.formFiltros.p_fecha_ingreso_hasta) {
            this.showDialog = true;
            this.dialogMessage = 'La fecha de ingreso desde no puede ser mayor a la fecha de ingreso hasta';
            return;
        }
        if (
            (this.formFiltros.p_edad_desde !== null && this.formFiltros.p_edad_hasta === null) ||
            (this.formFiltros.p_edad_desde === null && this.formFiltros.p_edad_hasta !== null)
        ) {
            this.showDialog = true;
            this.dialogMessage = 'Ambas edades son obligatorias';
            return;
        }
        if (this.formFiltros.p_edad_desde > this.formFiltros.p_edad_hasta) {
            this.showDialog = true;
            this.dialogMessage = 'La edad desde no puede ser mayor a la edad hasta';
            return;
        }

        if (this.formFiltros.p_embarazo === 'null') {
            this.formFiltros.p_embarazo = null;
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

        if (this.formFiltros.p_embarazo === null) {
            this.formFiltros.p_embarazo = 'null';
        }
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
            p_embarazo: null,
        };

        this.filter();
    }
}
