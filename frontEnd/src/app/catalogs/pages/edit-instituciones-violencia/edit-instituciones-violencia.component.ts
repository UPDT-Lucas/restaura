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
    templateUrl: './edit-instituciones-violencia.component.html',
    styleUrls: ['./edit-instituciones-violencia.component.css'],
})
export class EditInstitucionesViolenciaComponent {
    constructor(
        private collectionsService: CollectionsService,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    cargando: boolean = true;
    showModal: boolean = false;

    formData: any = {
        nombreInstitucionesViolencia: null,
        idInstitucionesViolencia: null,
    };

    ngOnInit(): void {
        this.collectionsService.getCatalogos().subscribe({
            next: (data) => {
                this.formData.idInstitucionesViolencia = this.route.snapshot.paramMap.get('id') || '0';

                const item = data.institucionesViolencia.find(
                    (i: any) => i.id.toString() === this.formData.idInstitucionesViolencia,
                );
                if (item) {
                    this.formData.nombreInstitucionesViolencia = item.nombre;
                } else {
                    console.error('Institución no encontrada');
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
            nombreInstitucionesViolencia: null,
            idInstitucionesViolencia: null,
        };
    }

    @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;
    editarInstitucionesViolencia(confirmed: boolean): void {
        this.showModal = false;
        if (confirmed) {
            this.cargando = true;

            this.collectionsService.editInstitucionesViolencia(this.formData).subscribe({
                next: (response) => {
                    this.cargando = false;

                    if (response.status === 200) {
                        this.resetForm();
                        this.router.navigate(['/instituciones-violencia'], {
                            queryParams: { 'type-response': '2' },
                        });
                    } else {
                        console.error('Error al guardar la institución:', response);
                        this.snackbar.show('Error al guardar la institución', 3000);
                    }
                },
                error: (error) => {
                    console.error('Error al guardar la institución:', error);
                    this.snackbar.show('Error al guardar la institución', 3000);
                },
            });
        }
    }
}
