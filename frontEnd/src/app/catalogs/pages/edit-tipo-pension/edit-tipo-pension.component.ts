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
    templateUrl: './edit-tipo-pension.component.html',
    styleUrls: ['./edit-tipo-pension.component.css'],
})
export class EditTipoPensionComponent {
    constructor(
        private collectionsService: CollectionsService,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    cargando: boolean = true;
    showModal: boolean = false;

    formData: any = {
        nombreTipoPension: null,
        idTipoPension: null,
    };

    ngOnInit(): void {
        this.collectionsService.getCatalogos().subscribe({
            next: (data) => {
                this.formData.idTipoPension = this.route.snapshot.paramMap.get('id') || '0';

                const item = data.tipoPension.find((t: any) => t.id.toString() === this.formData.idTipoPension);
                if (item) {
                    this.formData.nombreTipoPension = item.nombre;
                } else {
                    console.error('Tipo de pensión no encontrado');
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
            nombreTipoPension: null,
            idTipoPension: null,
        };
    }

    @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;
    editarTipoPension(confirmed: boolean): void {
        this.showModal = false;
        if (confirmed) {
            this.cargando = true;

            this.collectionsService.editTipoPension(this.formData).subscribe({
                next: (response) => {
                    this.cargando = false;

                    if (response.status === 200) {
                        this.resetForm();
                        this.router.navigate(['/tipos-pension'], {
                            queryParams: { 'type-response': '2' },
                        });
                    } else {
                        console.error('Error al guardar el tipo de pensión:', response);
                        this.snackbar.show('Error al guardar el tipo de pensión', 3000);
                    }
                },
                error: (error) => {
                    console.error('Error al guardar el tipo de pensión:', error);
                    this.snackbar.show('Error al guardar el tipo de pensión', 3000);
                },
            });
        }
    }
}
