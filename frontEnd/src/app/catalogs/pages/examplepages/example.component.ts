import { Component } from "@angular/core";
import { DynamicTableComponent } from "../../../shared/components/dynamic-table/dynamic-table.component";
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component ({
    selector: 'table-example',
    imports: [DynamicTableComponent],
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.css'],
})
export class ParentComponent {
    tableData = [
        ['ID', 'Nombre', 'Edad'],
        ['1', 'Juan', '25'],
        ['2', 'Ana', '30'],
        ['3', 'Luis', '28'],
        ['4', 'Sofía', '21'],
    ];

    currentPage = 1;
    limitPerPage = 10;

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
}
