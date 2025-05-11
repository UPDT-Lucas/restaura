import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
import { TitleOneComponent } from '../../../shared/components/title/title.component';
import { InputDateComponent } from '../../../shared/components/input-date/input-date.component';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { CatalogoService } from '../../../services/catalogo.service';
import { InputRangeComponent } from '../../../shared/components/input-range/input-range.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { SecondaryButtonComponent } from '../../../shared/components/secondary-button/secondary-button.component';

@Component({
    selector: 'app-consultas',
    imports: [
        DynamicTableComponent,
        TitleOneComponent,
        InputDateComponent,
        SelectComponent,
        CommonModule,
        InputRangeComponent,
        ButtonComponent,
        SecondaryButtonComponent,
    ],
    templateUrl: './consultas.component.html',
    styleUrls: ['./consultas.component.css'],
})
export class ConsultasComponent {
    constructor(private catalogoService: CatalogoService) {}

    // Form Filtros
    formFiltros: any = {
        fechaDesde: null,
        fechaHasta: null,
        genero_id: null,
        rango_edad: null,
    };

    tableData = [
        ['ID', 'Nombre', 'Edad'],
        ['1', 'Juan', '25'],
        ['2', 'Ana', '30'],
        ['3', 'Luis', '28'],
        ['4', 'Sofía', '21'],
    ];

    currentPage = 1;
    limitPerPage = 10;
    cargando: boolean = true;
    generoOptions: { label: string; value: string }[] = [];

    ngOnInit() {
        this.catalogoService.getCatalogos().subscribe({
            next: (data) => {
                this.generoOptions = data.genero.map((item: any) => ({
                    label: item.nombre,
                    value: item.id.toString(),
                }));

                this.cargando = false;
            },
            error: (error) => {
                console.error('Error al obtener los catálogos:', error);
            },
        });
    }

    onDeleteRow(id: string) {
        console.log('Eliminar registro con ID:', id);
        // Aquí haces la lógica de eliminar en tu servicio
    }

    onUpdatePage(page: number) {
        console.log('Actualizar a página:', page);
        this.currentPage = page;
        // Aquí puedes cargar nuevos datos para esa página
    }

    onUpdateLimit(limit: number) {
        console.log('Actualizar límite por página:', limit);
        this.limitPerPage = limit;
        // Aquí puedes actualizar los datos con el nuevo límite
    }

    actualizarRango(event: { desde: number | null; hasta: number | null }) {
        console.log('Nuevo rango:', event);
    }

    filter() {
        //Lógica de Filtros
    }

    clearFilters() {
        this.formFiltros = {
            fechaDesde: null,
            fechaHasta: null,
            genero_id: null,
            rango_edad: null,
        };
    }
}
