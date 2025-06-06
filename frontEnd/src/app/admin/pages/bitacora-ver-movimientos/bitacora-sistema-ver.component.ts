import { Component } from '@angular/core';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
import { AdminService } from '../../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { TitleOneComponent } from '../../../shared/components/title/title.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-bitacora-ver-movimientos',
    imports: [DynamicTableComponent, TitleOneComponent, CommonModule],
    templateUrl: './bitacora-sistema-ver.component.html',
    styleUrls: ['./bitacora-sistema-ver.component.css'],
})
export class BitacoraMovimientosSistemaComponent {
    constructor(private adminService: AdminService, private route: ActivatedRoute) {}

    headers = [['Id', 'Acción', 'Fecha', 'Módulo']];
    cargando: boolean = true;
    datos: { [key: string]: any } = {};

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id') || '0';

        this.adminService.getMovimientosBitacora(id).subscribe({
            next: (data) => {
                console.log('Movimientos de bitácora: ', data);
                if (data.status === 200) {
                    this.datos = data.valor;
                }
                this.cargando = false;
            },
            error: (error) => {
                console.error('Error al obtener movimientos de bitácora: ', error);
                this.cargando = false;
            },
        });
    }

    objectKeys(obj: any): string[] {
        return Object.keys(obj || {});
    }
}
