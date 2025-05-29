import { Component, ViewChild } from '@angular/core';
import { TitleOneComponent } from '../../../shared/components/title/title.component';
import { InputTextComponent } from '../../../shared/components/input-text/input-text.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { SnackbarComponent } from '../../../shared/components/snackbar/snackbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CuartosService } from '../../../services/cuartos.service';
import { InputBooleanComponent } from '../../../shared/components/input-boolean/input-boolean.component';
import { SelectComponent } from '../../../shared/components/select/select.component';

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
        InputBooleanComponent,
        SelectComponent,
    ],
    templateUrl: './edit-cama.component.html',
    styleUrls: ['./edit-cama.component.css'],
})
export class EditCamaComponent {
    constructor(private cuartosService: CuartosService, private route: ActivatedRoute, private router: Router) {}

    cargando: boolean = true;
    showModal: boolean = false;
    tipoCamaOptions: { label: string; value: string }[] = [];

    formData: any = {
        nombre: null,
        tipo_cama_id: null,
        active: null,
        idCama: null,
    };

    ngOnInit(): void {

        
        this.cuartosService.getTiposCamas().subscribe({
            next: (data) => {
                this.tipoCamaOptions = data.tiposCamas.map((item: any) => ({
                    label: item.nombre,
                    value: item.id.toString(),
                }));

                this.cargando = false;
            },
            error: (error) => {
                console.error('Error al obtener las tipos camas:', error);
            },
        });
    }


    confirmUpdate() {
        this.showModal = true;
    }

    resetForm() {
        this.formData = {
            nombre: null,
            tipo_cama_id: null,
            active: null,
            idCama: null,
        };
    }

    @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;
    editarCuarto(confirmed: boolean): void {
        this.showModal = false;
        if (confirmed) {
            this.cargando = true;

            this.cuartosService
                .editCama({
                    nombre: this.formData.nombre,
                    tipo_cuarto_id: this.formData.tipo_cama_id,
                    active: this.formData.active,
                    id: this.route.snapshot.paramMap.get('id') || '0',
                })
                .subscribe({
                    next: (response) => {
                        this.cargando = false;

                        if (response.status === 200) {
                            this.resetForm();
                            /*this.router.navigate(['/cuartos'], {
                                queryParams: { 'type-response': '2' },
                            });*/
                        } else {
                            console.error('Error al guardar cama:', response);
                            this.snackbar.show('Error al guardar cama', 3000);
                        }
                    },
                    error: (error) => {
                        this.cargando = false;
                        console.error('Error al guardar cama:', error);
                        this.snackbar.show('Error al guardar cama', 3000);
                    },
                });
        }
    }
}
