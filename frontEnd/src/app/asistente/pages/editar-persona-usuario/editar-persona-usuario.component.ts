import { Component } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';
import { __param } from 'tslib';

@Component({
    selector: 'editar-persona-usuario',
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
    ],
    templateUrl: './editar-persona-usuario.component.html',
    styleUrls: ['./editar-persona-usuario.component.css'],
})
export class EditPersonComponent {
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

    // Variables Formulario

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

    provinciaId: any = null;
    inamu_informacion: boolean = false;

    cargando: boolean = true;

    constructor(
        private catalogoService: CatalogoService,
        private clientService: ClientService,
        private cantonesService: CantonesService,
        private route: ActivatedRoute,
    ) {}

    // Llamada API
    ngOnInit(): void {
        const clientId = this.route.snapshot.paramMap.get('id');
        this.catalogoService.getCatalogos().subscribe({
            next: (data) => {
                this.catalogos = data;

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
            },
        });

        // Obtener datos del cliente
        this.clientService.getAllInfoClient(clientId!).subscribe({
            next: (data: any) => {
                this.provinciaId = data.personal.provincia_id?.toString() ?? null;

                this.cantonesService.getCantonesPorProvincia(this.provinciaId).subscribe({
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

                // 1. Secciones simples
                this.formPersonaUsuario.personal = {
                    ...data.personal,
                    tipo_id_id: data.personal.tipo_id_id?.toString(),
                    genero_id: data.personal.genero_id?.toString(),
                    pais_id: data.personal.pais_id?.toString(),
                    canton_id: data.personal.canton_id?.toString(),
                    donde_dormi_id: data.personal.donde_dormi_id?.toString(),
                    tiempo_calle_id: data.personal.tiempo_calle_id?.toString(),
                };

                this.formPersonaUsuario.info3meses_id = {
                    id: data.info3meses_id?.id ?? null,
                    carcel: data.info3meses_id?.carcel ?? false,
                    razoncarcel: data.info3meses_id?.razon_carcel ?? null,
                    tratamiento_medico: data.info3meses_id?.tratamiento_medico ?? false,
                    razon_trat: data.info3meses_id?.razon_trat ?? null,
                    tratamiento_psiq: data.info3meses_id?.tratamiento_psiq ?? false,
                    razon_psiq: data.info3meses_id?.razon_psiq ?? null,
                    tratamiento_drogas: data.info3meses_id?.tratamiento_drogas ?? false,
                    razon_drogas: data.info3meses_id?.razon_drogas ?? null,
                };

                this.formPersonaUsuario.contacto = {
                    id: data.contacto?.id ?? null,
                    nombre: data.contacto?.nombre ?? null,
                    telefono: data.contacto?.telefono ?? null,
                    relacion: data.contacto?.relacion ?? null,
                };

                this.inamu_informacion = !!data.inamu;
                this.formPersonaUsuario.inamu = data.inamu
                    ? {
                          id: data.inamu.id ?? null,
                          jefehogar: data.inamu.jefehogar ?? false,
                          contactofamilia: data.inamu.contactofamilia ?? false,
                          apoyoeconomico: data.inamu.apoyoeconomico ?? false,
                          pareja: data.inamu.pareja ?? false,
                          parejacentro: data.inamu.parejacentro ?? false,
                          parejano: data.inamu.parejano ?? null,
                          solucionesdetalle: data.inamu.solucionesdetalle ?? null,
                      }
                    : null;

                // 2. Secciones tipo lista (IDs en string)
                this.formPersonaUsuario.catalogos.tipos_ayuda =
                    data.tipos_ayuda?.map((a: any) => a.id.toString()) ?? [];
                this.formPersonaUsuario.catalogos.tipos_violencia =
                    data.tipos_violencia?.map((a: any) => a.id.toString()) ?? [];
                this.formPersonaUsuario.catalogos.instituciones_violencia =
                    data.instituciones_violencia?.map((a: any) => a.id.toString()) ?? [];
                this.formPersonaUsuario.catalogos.gradosacademicos =
                    data.gradosacademicos?.map((a: any) => a.id.toString()) ?? [];
                this.formPersonaUsuario.catalogos.drogas = data.drogas?.map((a: any) => a.id.toString()) ?? [];
                this.formPersonaUsuario.catalogos.pensiones = data.pensiones?.map((a: any) => a.id.toString()) ?? [];
                this.formPersonaUsuario.catalogos.razon_servicio =
                    data.razon_servicio?.map((a: any) => a.id.toString()) ?? [];
            },
            error: (error) => {
                console.error('Error al obtener los datos del cliente:', error);
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

    editarPersonaUsuario() {
        this.cargando = true;

        // Hacer una copia profunda del objeto para no modificar el original
        const personaEditada = JSON.parse(JSON.stringify(this.formPersonaUsuario));

        // Si no hay información del INAMU, eliminarla
        if (!this.inamu_informacion) {
            personaEditada.inamu = null;
        }

        // Si contacto está completamente vacío, eliminar el objeto contacto
        const contacto = personaEditada.contacto;
        if (contacto?.nombre === null && contacto?.telefono === null && contacto?.relacion === null) {
            personaEditada.contacto = null;
        }

        // Convertir campos que deben ser números
        const personal = personaEditada.personal;
        personal.genero_id = personal.genero_id !== null ? Number(personal.genero_id) : null;
        personal.tipo_id_id = personal.tipo_id_id !== null ? Number(personal.tipo_id_id) : null;
        personal.canton_id = personal.canton_id !== null ? Number(personal.canton_id) : null;
        personal.pais_id = personal.pais_id !== null ? Number(personal.pais_id) : null;
        personal.donde_dormi_id = personal.donde_dormi_id !== null ? Number(personal.donde_dormi_id) : null;
        personal.tiempo_calle_id = personal.tiempo_calle_id !== null ? Number(personal.tiempo_calle_id) : null;

        // Convertir arrays de strings a arrays de números
        const catalogos = personaEditada.catalogos;
        catalogos.tipos_ayuda = catalogos.tipos_ayuda.map((id: string) => Number(id));
        catalogos.tipos_violencia = catalogos.tipos_violencia.map((id: string) => Number(id));
        catalogos.instituciones_violencia = catalogos.instituciones_violencia.map((id: string) => Number(id));

        // Mostrar en consola para depuración
        console.log('Objeto final a enviar:', personaEditada);

        // Enviar la solicitud
        this.clientService.editClient(personaEditada).subscribe((response) => {
            this.cargando = false;

            if (response.status === 200) {
                console.log('Persona usuario guardada correctamente:', response.data);
            } else {
                console.error('Error al guardar la persona usuario:', response);
            }
        });
    }
}
