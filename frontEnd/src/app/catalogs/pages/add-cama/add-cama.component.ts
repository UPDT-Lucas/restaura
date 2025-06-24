import { Component, ViewChild } from '@angular/core';
import { TitleOneComponent } from '../../../shared/components/title/title.component';
import { InputTextComponent } from '../../../shared/components/input-text/input-text.component';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { SnackbarComponent } from '../../../shared/components/snackbar/snackbar.component';
import { Router } from '@angular/router';
import { InputBooleanComponent } from '../../../shared/components/input-boolean/input-boolean.component';
import { CuartosService } from '../../../services/cuartos.service';
import { LinkStackService } from '../../../services/link-stack.service';
import { ActivatedRoute } from '@angular/router';

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
        InputBooleanComponent,
    ],
    templateUrl: './add-cama.component.html',
    styleUrls: ['./add-cama.component.css'],
})
export class AddCamaComponent {
    constructor(private cuartosService: CuartosService, private router: Router,private route: ActivatedRoute, private linkStack: LinkStackService) {}

    cargando: boolean = false;
    showModal: boolean = false;
    tipoCamaOptions: { label: string; value: string }[] = [];

    formData: any = {
        nombre: null,
        tipo_cama_id: null,
        active: null,
        cuarto_id: null,
    };

    ngOnInit(): void {
        const idCuarto = this.route.snapshot.paramMap.get('id') || '0';
        this.formData.cuarto_id = idCuarto;

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
            cuarto_id: null,
        };
    }

    @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;
    crearCama(confirmed: boolean): void {
        this.showModal = false;
        if (confirmed) {
            this.cargando = true;

            this.cuartosService.addCama(this.formData).subscribe({
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
                        console.error('Error al guardar la cama:', response);
                        this.snackbar.show('Error al guardar la cama', 3000);
                    }
                },
                error: (error) => {
                    this.cargando = false;
                    console.error('Error al guardar la cama:', error);
                    this.snackbar.show('Error al guardar la cama', 3000);
                },
            });
        }
    }
}
