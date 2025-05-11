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
    templateUrl: './edit-tiempo-calle.component.html',
    styleUrls: ['./edit-tiempo-calle.component.css'],
})
export class EditTiempoCalleComponent {
    constructor(
        private collectionsService: CollectionsService,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    cargando: boolean = true;
    showModal: boolean = false;

    formData: any = {
        nombreTiempoCalle: null,
        idTiempoCalle: null,
    };

    ngOnInit(): void {
        this.collectionsService.getCatalogos().subscribe({
            next: (data) => {
                this.formData.idTiempoCalle = this.route.snapshot.paramMap.get('id') || '0';

                const item = data.tiempoCalle.find((t: any) => t.id.toString() === this.formData.idTiempoCalle);
                if (item) {
                    this.formData.nombreTiempoCalle = item.nombre;
                } else {
                    console.error('Tiempo en calle no encontrado');
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
            nombreTiempoCalle: null,
            idTiempoCalle: null,
        };
    }

    @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;
    editarTiempoCalle(confirmed: boolean): void {
        this.showModal = false;
        if (confirmed) {
            this.cargando = true;

            this.collectionsService.editTiempoCalle(this.formData).subscribe({
                next: (response) => {
                    this.cargando = false;

                    if (response.status === 200) {
                        this.resetForm();
                        this.router.navigate(['/tiempo-calle'], {
                            queryParams: { 'type-response': '2' },
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
