import { Component, ViewChild } from '@angular/core';
import { TitleOneComponent } from '../../../shared/components/title/title.component';
import { InputTextComponent } from '../../../shared/components/input-text/input-text.component';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { CollectionsService } from '../../../services/collections.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { SnackbarComponent } from '../../../shared/components/snackbar/snackbar.component';
import { ActivatedRoute, Router } from '@angular/router';

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
    ],
    templateUrl: './editcanton.component.html',
    styleUrls: ['./editcanton.component.css'],
})
export class EditCantonComponent {
    constructor(
        private collectionsService: CollectionsService,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    cargando: boolean = true;
    showModal: boolean = false;
    provinciaOptions: { label: string; value: string }[] = [];

    formData: any = {
        nombreCanton: null,
        idProvincia: null,
        idCanton: null,
    };

    ngOnInit(): void {
        this.collectionsService.getCatalogos().subscribe({
            next: (data) => {
                this.formData.idCanton = this.route.snapshot.paramMap.get('id') || '0';

                this.provinciaOptions = data.provincia.map((item: any) => ({
                    label: item.nombre,
                    value: item.id.toString(),
                }));

                let cantones = data.canton;
                const cantonEncontrado = cantones.find((c: any) => c.id.toString() === this.formData.idCanton);
                if (cantonEncontrado) {
                    this.formData.nombreCanton = cantonEncontrado.nombre;
                    this.formData.idProvincia = cantonEncontrado.provincia_id.toString();
                } else {
                    console.error('Canton no encontrado');
                }

                this.cargando = false;
            },
            error: (error) => {
                this.cargando = false;
                console.error('Error al obtener los catalogos:', error);
            },
        });
    }

    confirmUpdate() {
        this.showModal = true;
    }

    resetForm() {
        this.formData = {
            nombreCanton: null,
            idProvincia: null,
        };
    }

    @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;
    editarCanton(confirmed: boolean): void {
        this.showModal = false;
        if (confirmed) {
            this.cargando = true;

            this.collectionsService.editCanton(this.formData).subscribe({
                next: (response) => {
                    this.cargando = false;

                    if (response.status === 200) {
                        this.resetForm();
                        this.router.navigate(['/cantones'], {
                            queryParams: { 'type-response': '2' },
                        });
                    } else {
                        console.error('Error al guardar el cantón:', response);
                        this.snackbar.show('Error al guardar el cantón', 3000);
                    }
                },
                error: (error) => {
                    console.error('Error al guardar el canton:', error);
                    this.snackbar.show('Error al guardar el cantón', 3000);
                },
            });
        }
    }
}
