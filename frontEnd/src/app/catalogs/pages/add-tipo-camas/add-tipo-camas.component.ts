import { Component, ViewChild } from '@angular/core';
import { TitleOneComponent } from '../../../shared/components/title/title.component';
import { InputTextComponent } from '../../../shared/components/input-text/input-text.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { SnackbarComponent } from '../../../shared/components/snackbar/snackbar.component';
import { Router } from '@angular/router';
import { ColorPickerComponent } from '../../../shared/components/color-picker/color-picker.component';
import { LinkStackService } from '../../../services/link-stack.service';
import { CuartosService } from '../../../services/cuartos.service';

@Component({
    selector: 'table-example',
    imports: [
        CommonModule,
        TitleOneComponent,
        InputTextComponent,
        ButtonComponent,
        ConfirmDialogComponent,
        SnackbarComponent,
        ColorPickerComponent,
    ],
    templateUrl: './add-tipo-camas.component.html',
    styleUrls: ['./add-tipo-camas.component.css'],
})
export class AddTipoCamaComponent {
    constructor(
        private cuartosService: CuartosService,
        private router: Router,
        private linkStack: LinkStackService,
    ) {}

    cargando: boolean = false;
    showModal: boolean = false;

    formData: any = {
        nombreTipoCama: null,
        color: null,
    };

    confirmUpdate() {
        this.showModal = true;
    }

    resetForm() {
        this.formData = {
            nombreTipoCama: null,
            color: null,
        };
    }

    @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;
    crearTipoCama(confirmed: boolean): void {
        this.showModal = false;
        if (confirmed) {
            this.cargando = true;

            this.cuartosService.addTipoCama(this.formData).subscribe({
                next: (response) => {
                    this.cargando = false;

                    if (response.status === 200) {
                        this.linkStack.popLink();

                        const previousUrl = this.linkStack.popLink();

                        if (previousUrl) {
                            const urlParts = previousUrl.split('?');
                            const routePath = urlParts[0];

                            this.router.navigate([routePath], { queryParams: { 'type-response': '1' } });
                        } else {
                            this.router.navigate(['/']);
                        }
                    } else {
                        console.error('Error al guardar el tipo cama:', response);
                        this.snackbar.show('Error al guardar el tipo cama', 3000);
                    }
                },
                error: (error) => {
                    this.cargando = false;
                    console.error('Error al guardar el tipo cama:', error);
                    this.snackbar.show('Error al guardar el tipo cama', 3000);
                },
            });
        }
    }
}
