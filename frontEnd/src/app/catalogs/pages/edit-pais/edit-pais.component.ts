import { Component, ViewChild } from '@angular/core';
import { TitleOneComponent } from '../../../shared/components/title/title.component';
import { InputTextComponent } from '../../../shared/components/input-text/input-text.component';
import { CollectionsService } from '../../../services/collections.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { SnackbarComponent } from '../../../shared/components/snackbar/snackbar.component';
import { ActivatedRoute, Router } from '@angular/router';

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
    ],
    templateUrl: './edit-pais.component.html',
    styleUrls: ['./edit-pais.component.css'],
})
export class EditPaisComponent {
    constructor(
        private collectionsService: CollectionsService,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    cargando: boolean = true;
    showModal: boolean = false;

    formData: any = {
        nombrePais: null,
        idPais: null,
    };

    ngOnInit(): void {
        this.collectionsService.getCatalogos().subscribe({
            next: (data) => {
                this.formData.idPais = this.route.snapshot.paramMap.get('id') || '0';

                const item = data.pais.find((p: any) => p.id.toString() === this.formData.idPais);
                if (item) {
                    this.formData.nombrePais = item.nombre;
                } else {
                    console.error('País no encontrado');
                }

                this.cargando = false;
            },
            error: (error) => {
                this.cargando = false;
                console.error('Error al obtener los catálogos:', error);
            },
        });
    }

    confirmUpdate() {
        this.showModal = true;
    }

    resetForm() {
        this.formData = {
            nombrePais: null,
            idPais: null,
        };
    }

    @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;
    editarPais(confirmed: boolean): void {
        this.showModal = false;
        if (confirmed) {
            this.cargando = true;

            this.collectionsService.editPais(this.formData).subscribe({
                next: (response) => {
                    this.cargando = false;

                    if (response.status === 200) {
                        this.resetForm();
                        this.router.navigate(['/paises'], {
                            queryParams: { 'type-response': '2' },
                        });
                    } else {
                        console.error('Error al guardar el país:', response);
                        this.snackbar.show('Error al guardar el país', 3000);
                    }
                },
                error: (error) => {
                    console.error('Error al guardar el país:', error);
                    this.snackbar.show('Error al guardar el país', 3000);
                },
            });
        }
    }
}
