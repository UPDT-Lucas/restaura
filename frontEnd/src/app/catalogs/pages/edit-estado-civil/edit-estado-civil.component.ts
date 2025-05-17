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
    templateUrl: './edit-estado-civil.component.html',
    styleUrls: ['./edit-estado-civil.component.css'],
})
export class EditEstadoCivilComponent {
    constructor(
        private collectionsService: CollectionsService,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    cargando: boolean = true;
    showModal: boolean = false;

    formData: any = {
        nombreEstadoCivil: null,
        idEstadoCivil: null,
    };

    ngOnInit(): void {
        this.collectionsService.getCatalogos().subscribe({
            next: (data) => {
                this.formData.idEstadoCivil = this.route.snapshot.paramMap.get('id') || '0';

                const item = data.estadoCivil.find((e: any) => e.id.toString() === this.formData.idEstadoCivil);
                if (item) {
                    this.formData.nombreEstadoCivil = item.nombre;
                } else {
                    console.error('Estado civil no encontrado');
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
            nombreEstadoCivil: null,
            idEstadoCivil: null,
        };
    }

    @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;
    editarEstadoCivil(confirmed: boolean): void {
        this.showModal = false;
        if (confirmed) {
            this.cargando = true;

            this.collectionsService.editEstadoCivil(this.formData).subscribe({
                next: (response) => {
                    this.cargando = false;

                    if (response.status === 200) {
                        this.resetForm();
                        this.router.navigate(['/estados-civiles'], {
                            queryParams: { 'type-response': '2' },
                        });
                    } else {
                        console.error('Error al guardar el estado civil:', response);
                        this.snackbar.show('Error al guardar el estado civil', 3000);
                    }
                },
                error: (error) => {
                    console.error('Error al guardar el estado civil:', error);
                    this.snackbar.show('Error al guardar el estado civil', 3000);
                },
            });
        }
    }
}
