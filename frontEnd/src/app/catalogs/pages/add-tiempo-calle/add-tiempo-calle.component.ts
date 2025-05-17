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
    templateUrl: './add-tiempo-calle.component.html',
    styleUrls: ['./add-tiempo-calle.component.css'],
})
export class AddTiempoCalleComponent {
    constructor(private collectionsService: CollectionsService, private router: Router) {}

    cargando: boolean = false;
    showModal: boolean = false;

    formData: any = {
        nombreTiempoCalle: null,
    };

    confirmUpdate() {
        this.showModal = true;
    }

    resetForm() {
        this.formData = {
            nombreTiempoCalle: null,
        };
    }

    @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;
    crearTiempoCalle(confirmed: boolean): void {
        this.showModal = false;
        if (confirmed) {
            this.cargando = true;

            this.collectionsService.addTiempoCalle(this.formData).subscribe({
                next: (response) => {
                    this.cargando = false;

                    if (response.status === 200) {
                        this.resetForm();
                        this.router.navigate(['/tiempo-calle'], {
                            queryParams: { 'type-response': '1' },
                        });
                    } else {
                        console.error('Error al guardar el tiempo en calle:', response);
                        this.snackbar.show('Error al guardar el tiempo en calle', 3000);
                    }
                },
                error: (error) => {
                    console.error('Error al guardar el tiempo en calle:', error);
                    this.snackbar.show('Error al guardar el tiempo en calle', 3000);
                },
            });
        }
    }
}
