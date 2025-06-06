import { Component } from '@angular/core';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
import { AdminService } from '../../../services/admin.service';

@Component({
    selector: 'app-bitacora-sistema',
    imports: [DynamicTableComponent],
    templateUrl: './bitacora-sistema.component.html',
    styleUrls: ['./bitacora-sistema.component.css'],
})
export class BitacoraSistemaComponent {
    constructor(private adminService: AdminService) {}

    headers = [['Id', 'Acción', 'Fecha', 'Módulo']];
    tableData = this.headers;
    datos: any[] = [];
    totalItems = 0;

    currentPage = 1;
    limitPerPage = 10;
    cargando: boolean = true;

    ngOnInit() {
        this.adminService.getBitacoraSistema().subscribe({
            next: (data) => {
                if (data.status === 200) {
                    this.datos = data.registros.map((item: any) => [
                        item.id,
                        item.accion,
                        this.formatearFecha(item.fecha),
                        item.tabla,
                    ]);

                    this.getTotalItems();
                    this.actualizarTabla();
                }
                this.cargando = false;
            },
            error: (error) => {
                console.error('Error al obtener la bitácora: ', error);
                this.cargando = false;
            },
        });
    }

    getTotalItems() {
        this.totalItems = this.datos.length > 1 ? this.datos.length : 0;
    }

    actualizarTabla() {
        const start = (this.currentPage - 1) * this.limitPerPage;
        const end = start + this.limitPerPage;
        const paginados = this.datos.slice(start, end);

        this.tableData = [...this.headers, ...paginados];
    }

    onDeleteRow(id: string) {}

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

    formatearFecha(fechaISO: string): string {
        const fecha = new Date(fechaISO);
        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const anio = fecha.getFullYear();
        return `${dia}-${mes}-${anio}`;
    }
}
