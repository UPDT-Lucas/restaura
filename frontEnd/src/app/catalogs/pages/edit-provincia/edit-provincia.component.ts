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
    templateUrl: './edit-provincia.component.html',
    styleUrls: ['./edit-provincia.component.css'],
})
export class EditProvinciaComponent {
    constructor(
        private collectionsService: CollectionsService,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    cargando: boolean = true;
    showModal: boolean = false;

    formData: any = {
        nombreProvincia: null,
        idProvincia: null,
    };

    ngOnInit(): void {
        this.collectionsService.getCatalogos().subscribe({
            next: (data) => {
                this.formData.idProvincia = this.route.snapshot.paramMap.get('id') || '0';

                const item = data.provincia.find((p: any) => p.id.toString() === this.formData.idProvincia);
                if (item) {
                    this.formData.nombreProvincia = item.nombre;
                } else {
                    console.error('Provincia no encontrada');
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
            nombreProvincia: null,
            idProvincia: null,
        };
    }

    @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;
    editarProvincia(confirmed: boolean): void {
        this.showModal = false;
        if (confirmed) {
            this.cargando = true;

            this.collectionsService.editProvincia(this.formData).subscribe({
                next: (response) => {
                    this.cargando = false;

                    if (response.status === 200) {
                        this.resetForm();
                        this.router.navigate(['/provincias'], {
                            queryParams: { 'type-response': '2' },
                        });
                    } else {
                        console.error('Error al guardar la provincia:', response);
                        this.snackbar.show('Error al guardar la provincia', 3000);
                    }
                },
                error: (error) => {
                    console.error('Error al guardar la provincia:', error);
                    this.snackbar.show('Error al guardar la provincia', 3000);
                },
            });
        }
    }
}
