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
    templateUrl: './edit-donde-durmi.component.html',
    styleUrls: ['./edit-donde-durmi.component.css'],
})
export class EditDondeDurmiComponent {
    constructor(
        private collectionsService: CollectionsService,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    cargando: boolean = true;
    showModal: boolean = false;

    formData: any = {
        nombreDondeDormi: null,
        idDondeDormi: null,
    };

    ngOnInit(): void {
        this.collectionsService.getCatalogos().subscribe({
            next: (data) => {
                this.formData.idDondeDormi = this.route.snapshot.paramMap.get('id') || '0';

                let lista = data.dondeDormi;
                const item = lista.find((d: any) => d.id.toString() === this.formData.idDondeDormi);
                if (item) {
                    this.formData.nombreDondeDormi = item.nombre;
                } else {
                    console.error('Dato no encontrado');
                }

                this.cargando = false;
            },
            error: (error) => {
                this.cargando = false;
                console.error('Error al obtener los datos:', error);
            },
        });
    }

    confirmUpdate() {
        this.showModal = true;
    }

    resetForm() {
        this.formData = {
            nombreDondeDormi: null,
            idDondeDormi: null,
        };
    }

    @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;
    editarDondeDormi(confirmed: boolean): void {
        this.showModal = false;
        if (confirmed) {
            this.cargando = true;

            this.collectionsService.editDondeDormi(this.formData).subscribe({
                next: (response) => {
                    this.cargando = false;

                    if (response.status === 200) {
                        this.resetForm();
                        this.router.navigate(['/donde-dormi'], {
                            queryParams: { 'type-response': '2' },
                        });
                    } else {
                        console.error('Error al guardar:', response);
                        this.snackbar.show('Error al guardar', 3000);
                    }
                },
                error: (error) => {
                    console.error('Error al guardar:', error);
                    this.snackbar.show('Error al guardar', 3000);
                },
            });
        }
    }
}
