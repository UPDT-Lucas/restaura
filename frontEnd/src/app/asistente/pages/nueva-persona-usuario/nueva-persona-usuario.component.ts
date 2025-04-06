import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleOneComponent } from '../../../shared/components/title/title.component';
import { SubtitleComponent } from '../../../shared/components/subtitle/subtitle.component';
import { InputTextComponent } from '../../../shared/components/input-text/input-text.component';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { MultiselectComponent } from '../../../shared/components/multiselect/multiselect.components';
import { InputDateComponent } from '../../../shared/components/input-date/input-date.component';
import { InputTextAreaComponent } from '../../../shared/components/input-text-area/input-text-area.component';
import { InputBooleanComponent } from '../../../shared/components/input-boolean/input-boolean.component';
import { InputNumberComponent } from '../../../shared/components/input-number/input-number.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { SecondaryButtonComponent } from '../../../shared/components/secondary-button/secondary-button.component';
import { CatalogoService } from '../../../services/catalogo.service';

@Component({
    selector: 'nueva-persona-usuario',
    imports: [
        TitleOneComponent,
        SubtitleComponent,
        InputTextComponent,
        SelectComponent,
        MultiselectComponent,
        InputDateComponent,
        InputTextAreaComponent,
        InputBooleanComponent,
        InputNumberComponent,
        CommonModule,
        ButtonComponent,
        SecondaryButtonComponent,
    ],
    templateUrl: './nueva-persona-usuario.component.html',
    styleUrls: ['./nueva-persona-usuario.component.css'],
})
export class AddPersonComponent {
    // Variables Formulario
    trabajaActualmente: boolean = false;
    tieneLicencia: boolean = false;
    tresMesesCarcel: boolean = false;
    tresMesesTratamientoMedico: boolean = false;
    tresMesesTratamientoPsiquiatrico: boolean = false;
    tresMesesTratamientoDeDrogas: boolean = false;
    tomaMedicamento: boolean = false;
    consumeDrogas: boolean = false;
    haEstadoEnCarcel: boolean = false;
    tienePareja: boolean = false;
    suParejaHaceUsoDelDormitorio: boolean = false;

    // Variables API
    catalogos: any[] = [];
    tipoIdentificacionOptions: { label: string; value: string }[] = [];
    generoOptions: { label: string; value: string }[] = [];
    paisOptions: { label: string; value: string }[] = [];
    provinciaOptions: { label: string; value: string }[] = [];
    cantonOptions: { label: string; value: string }[] = [];
    contactoDormitorioOptions: { label: string; value: string }[] = [];
    razonServicioOptions: { label: string; value: string }[] = [];
    tiempoCalleOptions: { label: string; value: string }[] = [];
    tipoPensionesOptions: { label: string; value: string }[] = [];
    gradoAcademicoOptions: { label: string; value: string }[] = [];
    tipoDrogasOptions: { label: string; value: string }[] = [];
    tipoAyudaOptions: { label: string; value: string }[] = [];
    institucionesAyudaOptions: { label: string; value: string }[] = [];
    tipoViolenciaOptions: { label: string; value: string }[] = [];

    cargando: boolean = true;

    constructor(private catalogoService: CatalogoService) {}

    // Llamada API
    ngOnInit(): void {
        this.catalogoService.getCatalogos().subscribe({
            next: (data) => {
                this.catalogos = data;
                this.cargando = false;

                this.tipoIdentificacionOptions = data.tipoId.map((item: any) => ({
                    label: item.nombre,
                    value: item.id.toString(),
                }));

                this.generoOptions = data.genero.map((item: any) => ({
                    label: item.nombre,
                    value: item.id.toString(),
                }));

                this.paisOptions = data.pais.map((item: any) => ({
                    label: item.nombre,
                    value: item.id.toString(),
                }));

                this.provinciaOptions = data.provincia.map((item: any) => ({
                    label: item.nombre,
                    value: item.id.toString(),
                }));

                this.cantonOptions = data.canton.map((item: any) => ({
                    label: item.nombre,
                    value: item.id.toString(),
                }));

                this.contactoDormitorioOptions = data.dondeDormi.map((item: any) => ({
                    label: item.nombre,
                    value: item.id.toString(),
                }));

                this.razonServicioOptions = data.razonServicio.map((item: any) => ({
                    label: item.nombre,
                    value: item.id.toString(),
                }));

                this.tiempoCalleOptions = data.tiempoCalle.map((item: any) => ({
                    label: item.nombre,
                    value: item.id.toString(),
                }));

                this.tipoPensionesOptions = data.tipoPension.map((item: any) => ({
                    label: item.nombre,
                    value: item.id.toString(),
                }));

                this.gradoAcademicoOptions = data.gradoAcademico.map((item: any) => ({
                    label: item.nombre,
                    value: item.id.toString(),
                }));

                this.tipoDrogasOptions = data.droga.map((item: any) => ({
                    label: item.nombre,
                    value: item.id.toString(),
                }));

                this.tipoAyudaOptions = data.tiposAyuda.map((item: any) => ({
                    label: item.nombre,
                    value: item.id.toString(),
                }));

                this.institucionesAyudaOptions = data.institucionesViolencia.map((item: any) => ({
                    label: item.nombre,
                    value: item.id.toString(),
                }));

                this.tipoViolenciaOptions = data.tipoViolencia.map((item: any) => ({
                    label: item.nombre,
                    value: item.id.toString(),
                }));
            },
            error: (error) => {
                console.error('Error al obtener los catálogos:', error);
                this.cargando = false;
            },
        });
    }
}
