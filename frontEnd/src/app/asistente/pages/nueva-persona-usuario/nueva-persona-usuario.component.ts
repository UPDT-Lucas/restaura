import { Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
import { ClientService } from '../../../services/client.service';
import { CantonesService } from '../../../services/cantones.service';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { SnackbarComponent } from '../../../shared/components/snackbar/snackbar.component';



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
        ReactiveFormsModule,
        ConfirmDialogComponent,
        SnackbarComponent
    ],
    templateUrl: './nueva-persona-usuario.component.html',
    styleUrls: ['./nueva-persona-usuario.component.css'],
})
export class AddPersonComponent {
    // Formulario
    formPersonaUsuario: any = {
        personal: {
            nombre: null,
            tipo_id_id: null,
            id: null,
            nombreentrevistador: null,
            fechaingreso: null,
            edad: null,
            fechanacimiento: null,
            genero_id: null,
            cantidadhijos: null,
            pais_id: null,
            canton_id: null,
            donde_dormi_id: null,
            tiempo_calle_id: null,
            sitrabaja: false,
            empresa: null,
            ocupacion: null,
            licencia: false,
            tipo_licencia: null,
            observacion: null,
            tosflemafiebre: false,
            condicionespecial: null,
            discapacidad: false,
            medicacion: false,
            detallemedicamento: null,
            leerescribir: false,
            nombretecnico: null,
            consumodrogas: false,
            droga_principal: null,
            edadiniciodrogas: null,
            numerointernamientos: null,
            carcel: false,
            razoncarcel: null,
            pendienteresolucion: false,
            edadiniciocarcel: null,
        },
        info3meses_id: {
            carcel: false,
            razoncarcel: null,
            tratamiento_medico: false,
            razon_trat: null,
            tratamiento_psiq: false,
            razon_psiq: null,
            tratamiento_drogas: false,
            razon_drogas: null,
        },
        contacto: {
            nombre: null,
            telefono: null,
            relacion: null,
        },
        inamu: {
            jefehogar: false,
            contactofamilia: false,
            apoyoeconomico: false,
            pareja: false,
            parejacentro: false,
            parejano: null,
            solucionesdetalle: null,
        },
        catalogos: {
            tipos_ayuda: [],
            tipos_violencia: [],
            instituciones_violencia: [],
            gradosacademicos: [],
            drogas: [],
            pensiones: [],
            razon_servicio: [],
        },
    };

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

    // Variables de control
    provinciaId: any = null;
    inamu_informacion: boolean = false;

    cargando: boolean = true;

    constructor(
        private catalogoService: CatalogoService,
        private clientService: ClientService,
        private cantonesService: CantonesService,
    ) {}

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

                this.cantonOptions = [];

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

    onInamuInformacionChange(value: boolean): void {
        this.inamu_informacion = value;

        if (!value) {
            this.formPersonaUsuario.inamu = null;
        } else {
            this.formPersonaUsuario.inamu = {
                jefehogar: false,
                contactofamilia: false,
                apoyoeconomico: false,
                pareja: false,
                parejacentro: false,
                parejano: null,
                solucionesdetalle: null,
            };
        }
    }

    onProvinciaChange(provinciaId: string): void {
        this.cargando = true;
        this.provinciaId = provinciaId;
        this.formPersonaUsuario.personal.canton_id = null; // Limpiar canton actual

        if (provinciaId) {
            this.cantonesService.getCantonesPorProvincia(provinciaId).subscribe({
                next: (data) => {
                    this.cargando = false;

                    this.cantonOptions = data.map((item: any) => ({
                        label: item.nombre,
                        value: item.id.toString(),
                    }));
                },
                error: (error) => {
                    console.error('Error al obtener cantones:', error);
                    this.cantonOptions = []; // Limpiar por si falla
                },
            });
        } else {
            this.cantonOptions = []; // Si no hay provincia, vaciar cantones
        }
    }

    onIdentificacionChange(value: string): void {
        if (value !== null && value !== '') {
            this.clientService.getClientExist(value).subscribe({
                next: (response) => {
                    if (response.status === 200) {
                        console.log('Identificación ya existe:', response.data);
                    } else {
                        console.log('Identificación no existe, puedes continuar.');
                    }
                },
                error: (error) => {
                    console.error('Error al verificar la identificación:', error);
                },
            });
        }
    }
    public showModal: boolean = false;
    confirmUpdate() {
        this.showModal = true;

    }
    @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;
    crearPersonaUsuario(confirmed: boolean): void {
        this.showModal = false;
        if (confirmed) {
            this.cargando = true;

            if (!this.inamu_informacion) {
                this.formPersonaUsuario.inamu = null;
            }
            console.log('Objeto final:', this.formPersonaUsuario);
            // Aquí podrías hacer una petición POST si querés

            this.clientService.addClient(this.formPersonaUsuario).subscribe({
                next: (response) => {
                    this.cargando = false;

                    if (response.status === 200) {
                        console.log('Persona usuario guardada correctamente:', response.data);
                        this.snackbar.show('Persona usuario guardada correctamente',3000);
                    } else {
                        console.error('Error al guardar la persona usuario:', response);
                        this.snackbar.show('Error al guardar la persona usuario',3000);
                    }
                },
                error: (error) => {
                    console.error('Error al guardar la persona usuario:', error);
                },
            });
        }
    }
}
