import { Component, ViewChild } from '@angular/core';
import { TitleOneComponent } from '../../../shared/components/title/title.component';
import { InputTextComponent } from '../../../shared/components/input-text/input-text.component';
import { CollectionsService } from '../../../services/collections.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { SnackbarComponent } from '../../../shared/components/snackbar/snackbar.component';
import { Router } from '@angular/router';

@Component({
    selector: 'table-example',
    imports: [
        CommonModule,
        TitleOneComponent,
        InputTextComponent,
        ButtonComponent,
        ConfirmDialogComponent,
        SnackbarComponent,
    ],
    templateUrl: './add-provincia.component.html',
    styleUrls: ['./add-provincia.component.css'],
})
export class AddProvinciaComponent {
    constructor(private collectionsService: CollectionsService, private router: Router) {}

    cargando: boolean = false;
    showModal: boolean = false;

    formData: any = {
        nombreProvincia: null,
    };

    confirmUpdate() {
        this.showModal = true;
    }

    resetForm() {
        this.formData = {
            nombreProvincia: null,
        };
    }

    @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;
    crearProvincia(confirmed: boolean): void {
        this.showModal = false;
        if (confirmed) {
            this.cargando = true;

            this.collectionsService.addProvincia(this.formData).subscribe({
                next: (response) => {
                    this.cargando = false;

                    if (response.status === 200) {
                        this.resetForm();
                        this.router.navigate(['/provincias'], {
                            queryParams: { 'type-response': '1' },
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
