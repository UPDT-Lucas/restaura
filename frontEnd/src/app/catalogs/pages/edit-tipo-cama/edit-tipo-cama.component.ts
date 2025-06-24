import { Component, ViewChild } from '@angular/core';
import { TitleOneComponent } from '../../../shared/components/title/title.component';
import { InputTextComponent } from '../../../shared/components/input-text/input-text.component';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { SnackbarComponent } from '../../../shared/components/snackbar/snackbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CuartosService } from '../../../services/cuartos.service';
import { LinkStackService } from '../../../services/link-stack.service';
import { ColorPickerComponent } from '../../../shared/components/color-picker/color-picker.component';

@Component({
    selector: 'table-example',
    imports: [
        CommonModule,
        TitleOneComponent,
        InputTextComponent,
        SelectComponent,
        ButtonComponent,
        ConfirmDialogComponent,
        SnackbarComponent,
        ColorPickerComponent,
    ],
    templateUrl: './edit-tipo-cama.component.html',
    styleUrls: ['./edit-tipo-cama.component.css'],
})
export class EditTipoCamaComponent {
    constructor(
        private cuartosService: CuartosService,
        private route: ActivatedRoute,
        private router: Router,
        private linkStack: LinkStackService,
    ) {}

    cargando: boolean = true;
    showModal: boolean = false;

    formData: any = {
        nombreTipoCama: null,
        color: null,
        idTipoCama: null,
    };

    ngOnInit(): void {
        this.formData.idTipoCama = this.route.snapshot.paramMap.get('id') || '0';

        this.cuartosService.getTipoCama(this.formData.idTipoCama).subscribe({
            next: (response) => {
                if (response.status === 200) {
                    this.formData = {
                        nombreTipoCama: response.tipoCama.nombre,
                        color: response.tipoCama.color,
                        idTipoCama: this.formData.idTipoCama,
                    };
                } else {
                    console.error('Error al obtener el tipo de cama:', response);
                }
                this.cargando = false;
            },
            error: (error) => {
                console.error('Error al obtener el tipo de cama:', error);
                this.cargando = false;
            },
        });
    }

    confirmUpdate() {
        this.showModal = true;
    }

    resetForm() {
        this.formData = {
            nombreTipoCama: null,
            color: null,
            idTipoCama: null,
        };
    }

    @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;
    editarTipoCama(confirmed: boolean): void {
        this.showModal = false;
        if (confirmed) {
            this.cargando = true;

            console.log('Datos a enviar:', this.formData);

            this.cuartosService.editTipoCama(this.formData).subscribe({
                next: (response) => {
                    this.cargando = false;

                    if (response.status === 200) {
                        this.resetForm();
                        this.linkStack.popLink();

                        const previousUrl = this.linkStack.popLink();

                        if (previousUrl) {
                            const urlParts = previousUrl.split('?');
                            const routePath = urlParts[0];

                            this.router.navigate([routePath], { queryParams: { 'type-response': '2' } });
                        } else {
                            this.router.navigate(['/']);
                        };
                    } else {
                        console.error('Error al guardar el tipo Cama:', response);
                        this.snackbar.show('Error al guardar el tipo Cama', 3000);
                    }
                },
                error: (error) => {
                    this.cargando = false;
                    console.error('Error al guardar el tipo Cama:', error);
                    this.snackbar.show('Error al guardar el tipo Cama', 3000);
                },
            });
        }
    }
}
