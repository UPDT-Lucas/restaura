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
import { CatalogoService } from '../../../services/catalogo.service';
import { CantonesService } from '../../../services/cantones.service';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { FileExportModalComponent } from '../../../shared/components/modal-file/file-export-modal.component';
import jsPDF from 'jspdf';
import { ButtonComponent } from '../../../shared/components/button/button.component';

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
        ReactiveFormsModule,
        FileExportModalComponent,
        ButtonComponent,
    ],
    templateUrl: './ver-persona-usuario.component.html',
    styleUrls: ['./ver-persona-usuario.component.css'],
})
export class ViewPersonComponent {
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
            embarazo: 'null',
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

    // Variable Modal
    showModal = false;

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
    embarazadaOptions: { label: string; value: string }[] = [
        { label: 'Sí', value: 'true' },
        { label: 'No', value: 'false' },
        { label: 'No Aplica', value: 'null' },
    ];

    provinciaId: any = null;
    inamu_informacion: boolean = false;
    contacto_informacion: boolean = false;

    cargando: boolean = true;

    constructor(
        private catalogoService: CatalogoService,
        private cantonesService: CantonesService,
        private clientService: ClientService,
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
                    embarazo : data.personal.embarazo?.toString() ?? 'null',
                };

                this.formPersonaUsuario.info3meses_id = {
                    carcel: data.info3meses_id?.carcel ?? false,
                    razoncarcel: data.info3meses_id?.razon_carcel ?? null,
                    tratamiento_medico: data.info3meses_id?.tratamiento_medico ?? false,
                    razon_trat: data.info3meses_id?.razon_trat ?? null,
                    tratamiento_psiq: data.info3meses_id?.tratamiento_psiq ?? false,
                    razon_psiq: data.info3meses_id?.razon_psiq ?? null,
                    tratamiento_drogas: data.info3meses_id?.tratamiento_drogas ?? false,
                    razon_drogas: data.info3meses_id?.razon_drogas ?? null,
                };

                this.inamu_informacion = !!data.inamu;
                this.formPersonaUsuario.inamu = data.inamu
                    ? {
                          jefehogar: data.inamu.jefehogar ?? false,
                          contactofamilia: data.inamu.contactofamilia ?? false,
                          apoyoeconomico: data.inamu.apoyoeconomico ?? false,
                          pareja: data.inamu.pareja ?? false,
                          parejacentro: data.inamu.parejacentro ?? false,
                          parejano: data.inamu.parejano ?? null,
                          solucionesdetalle: data.inamu.solucionesdetalle ?? null,
                      }
                    : null;

                this.contacto_informacion = !!data.contacto;
                this.formPersonaUsuario.contacto = data.contacto
                    ? {
                          nombre: data.contacto.nombre ?? null,
                          telefono: data.contacto.telefono ?? null,
                          relacion: data.contacto.relacion ?? null,
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

    crearPersonaUsuario() {
        this.cargando = true;

        if (!this.inamu_informacion) {
            this.formPersonaUsuario.inamu = null;
        }
        // Aquí podrías hacer una petición POST si querés
    }

    openModal() {
        this.showModal = true;
    }

    onExport(format: 'csv' | 'pdf') {
        if (format === 'csv') {
            const data = [
                ['Información Entrevistador', ''],
                ['Nombre Entrevistador', this.formPersonaUsuario.personal.nombreentrevistador],
                ['Fecha Ingreso', this.formPersonaUsuario.personal.fechaingreso],
                ['Información Personal', ''],
                ['Nombre Persona Usuario', this.formPersonaUsuario.personal.nombre],
                [
                    'Tipo ID',
                    this.tipoIdentificacionOptions.find(
                        (option) => option.value === this.formPersonaUsuario.personal.tipo_id_id,
                    )?.label ?? 'N/A',
                ],
                ['Identificación', this.formPersonaUsuario.personal.id],
                ['Edad', this.formPersonaUsuario.personal.edad],
                ['Fecha Nacimiento', this.formPersonaUsuario.personal.fechanacimiento],
                [
                    'Género',
                    this.generoOptions.find((option) => option.value === this.formPersonaUsuario.personal.genero_id)
                        ?.label ?? 'N/A',
                ],
                ['Cantidad Hijos', this.formPersonaUsuario.personal.cantidadhijos],
                ['Embarazo', this.formPersonaUsuario.personal.embarazo ?? 'N/A'],
                ['Procedencia', ''],
                [
                    'País',
                    this.paisOptions.find((option) => option.value === this.formPersonaUsuario.personal.pais_id)
                        ?.label ?? 'N/A',
                ],
                [
                    'Cantón',
                    this.cantonOptions.find((option) => option.value === this.formPersonaUsuario.personal.canton_id)
                        ?.label ?? 'N/A',
                ],
                ['Dormitorio', ''],
                [
                    '¿Dónde Conoció el Dormitorio?',
                    this.contactoDormitorioOptions.find(
                        (option) => option.value === this.formPersonaUsuario.personal.donde_dormi_id,
                    )?.label ?? 'N/A',
                ],
                [
                    'Razón por la que acude al Dormitorio',
                    this.formPersonaUsuario.catalogos.razon_servicio
                        .map((id: string) => this.razonServicioOptions.find((opt) => opt.value === id)?.label)
                        .filter((label: string) => label)
                        .join(', ') || 'N/A',
                ],
                [
                    'Tiempo en Calle',
                    this.tiempoCalleOptions.find(
                        (option) => option.value === this.formPersonaUsuario.personal.tiempo_calle_id,
                    )?.label ?? 'N/A',
                ],
                ['Información Laboral', ''],
                ['¿Trabaja?', this.formPersonaUsuario.personal.sitrabaja ? 'Sí' : 'No'],
                ['Empresa', this.formPersonaUsuario.personal.empresa ?? 'N/A'],
                ['Ocupación', this.formPersonaUsuario.personal.ocupacion ?? 'N/A'],
                ['Licencias', ''],
                ['¿Tiene Licencia?', this.formPersonaUsuario.personal.licencia ? 'Sí' : 'No'],
                ['Tipo de Licencia', this.formPersonaUsuario.personal.tipo_licencia ?? 'N/A'],
                ['Observaciones'],
                ['Observación', this.formPersonaUsuario.personal.observacion ?? 'N/A'],
                ['Estado de Salud', ''],
                ['Tos, Flema o Fiebre', this.formPersonaUsuario.personal.tosflemafiebre ? 'Sí' : 'No'],
                ['Condición Especial', this.formPersonaUsuario.personal.condicionespecial ?? 'N/A'],
                ['¿Tiene Discapacidad?', this.formPersonaUsuario.personal.discapacidad ? 'Sí' : 'No'],
                ['¿Toma Medicación?', this.formPersonaUsuario.personal.medicacion ? 'Sí' : 'No'],
                ['Detalle Medicamento', this.formPersonaUsuario.personal.detallemedicamento ?? 'N/A'],
                ['¿Sabe Leer y Escribir?', this.formPersonaUsuario.personal.leerescribir ? 'Sí' : 'No'],
                ['Nombre Técnico', this.formPersonaUsuario.personal.nombretecnico ?? 'N/A'],
                ['Drogas y Cárcel', ''],
                ['¿Consume Drogas?', this.formPersonaUsuario.personal.consumodrogas ? 'Sí' : 'No'],
                [
                    'Droga Principal',
                    this.tipoDrogasOptions.find(
                        (option) => option.value === this.formPersonaUsuario.personal.droga_principal,
                    )?.label ?? 'N/A',
                ],
                ['Edad Inicio Drogas', this.formPersonaUsuario.personal.edadiniciodrogas ?? 'N/A'],
                ['Número de Internamientos', this.formPersonaUsuario.personal.numerointernamientos ?? 'N/A'],
                ['¿Ha Estado en la Cárcel?', this.formPersonaUsuario.personal.carcel ? 'Sí' : 'No'],
                ['Razón Cárcel', this.formPersonaUsuario.personal.razoncarcel ?? 'N/A'],
                ['¿Pendiente Resolución?', this.formPersonaUsuario.personal.pendienteresolucion ? 'Sí' : 'No'],
                ['Edad Inicio Cárcel', this.formPersonaUsuario.personal.edadiniciocarcel ?? 'N/A'],
                ['Información para Referencias', ''],
                ['¿Ha Estado en la Cárcel?', this.formPersonaUsuario.info3meses_id.carcel ? 'Sí' : 'No'],
                ['Razón Cárcel', this.formPersonaUsuario.info3meses_id.razoncarcel ?? 'N/A'],
                ['¿Tratamiento Médico?', this.formPersonaUsuario.info3meses_id.tratamiento_medico ? 'Sí' : 'No'],
                ['Razón Tratamiento Médico', this.formPersonaUsuario.info3meses_id.razon_trat ?? 'N/A'],
                ['¿Tratamiento Psiquiátrico?', this.formPersonaUsuario.info3meses_id.tratamiento_psiq ? 'Sí' : 'No'],
                ['Razón Tratamiento Psiquiátrico', this.formPersonaUsuario.info3meses_id.razon_psiq ?? 'N/A'],
                ['¿Tratamiento Drogas?', this.formPersonaUsuario.info3meses_id.tratamiento_drogas ? 'Sí' : 'No'],
                ['Pemsiones', ''],
                [
                    'Tipo de Pensión',
                    this.formPersonaUsuario.catalogos.pensiones
                        .map((id: string) => this.tipoPensionesOptions.find((opt) => opt.value === id)?.label)
                        .filter((label: string) => label)
                        .join(', ') || 'N/A',
                ],
                [
                    'Razón Servicio',
                    this.razonServicioOptions.find(
                        (option) => option.value === this.formPersonaUsuario.catalogos.razon_servicio[0],
                    )?.label ?? 'N/A',
                ],
                ['Razón Tratamiento Drogas', this.formPersonaUsuario.info3meses_id.razon_drogas ?? 'N/A'],
                ['Información de Contacto', ''],
                ['Nombre', this.formPersonaUsuario.contacto.nombre ?? 'N/A'],
                ['Teléfono', this.formPersonaUsuario.contacto.telefono ?? 'N/A'],
                ['Relación', this.formPersonaUsuario.contacto.relacion ?? 'N/A'],
                ['Información INAMU', ''],
                ['¿Es Jefe de Hogar?', this.formPersonaUsuario.inamu?.jefehogar ? 'Sí' : 'No'],
                ['¿Contacto Familiar?', this.formPersonaUsuario.inamu?.contactofamilia ? 'Sí' : 'No'],
                ['¿Apoyo Económico?', this.formPersonaUsuario.inamu?.apoyoeconomico ? 'Sí' : 'No'],
                ['¿Tiene Pareja?', this.formPersonaUsuario.inamu?.pareja ? 'Sí' : 'No'],
                [
                    '¿Recibe Ayuda de Institución?',
                    this.formPersonaUsuario.catalogos.tipos_ayuda
                        .map((id: string) => this.tipoAyudaOptions.find((opt) => opt.value === id)?.label)
                        .filter((label: string) => label)
                        .join(', ') || 'N/A',
                ],
                [
                    '¿Ha sufrido algun tipo de violencia?',
                    this.formPersonaUsuario.catalogos.tipos_violencia
                        .map((id: string) => this.tipoViolenciaOptions.find((opt) => opt.value === id)?.label)
                        .filter((label: string) => label)
                        .join(', ') || 'N/A',
                ],
                [
                    'Se dirigió a alguna institución de violencia',
                    this.formPersonaUsuario.catalogos.instituciones_violencia
                        .map((id: string) => this.institucionesAyudaOptions.find((opt) => opt.value === id)?.label)
                        .filter((label: string | undefined): label is string => !!label)
                        .join(', ') || 'N/A',
                ],
                ['¿Pareja en el Centro?', this.formPersonaUsuario.inamu?.parejacentro ? 'Sí' : 'No'],
                ['¿Porqué no está en el Centro?', this.formPersonaUsuario.inamu?.parejano ?? 'N/A'],
                ['Detalle Soluciones', this.formPersonaUsuario.inamu?.solucionesdetalle ?? 'N/A'],
            ];
            this.downloadCSV(data, 'reporte.csv');
        } else {
            const data = [
                ['Información Entrevistador'],
                ['Nombre Entrevistador', this.formPersonaUsuario.personal.nombreentrevistador],
                ['Fecha Ingreso', this.formPersonaUsuario.personal.fechaingreso],
                ['Información Personal'],
                ['Nombre Persona Usuario', this.formPersonaUsuario.personal.nombre],
                [
                    'Tipo ID',
                    this.tipoIdentificacionOptions.find(
                        (option) => option.value === this.formPersonaUsuario.personal.tipo_id_id,
                    )?.label ?? 'N/A',
                ],
                ['Identificación', this.formPersonaUsuario.personal.id],
                ['Edad', this.formPersonaUsuario.personal.edad],
                ['Fecha Nacimiento', this.formPersonaUsuario.personal.fechanacimiento],
                [
                    'Género',
                    this.generoOptions.find((option) => option.value === this.formPersonaUsuario.personal.genero_id)
                        ?.label ?? 'N/A',
                ],
                ['Cantidad Hijos', this.formPersonaUsuario.personal.cantidadhijos],
                ['Embarazo', this.formPersonaUsuario.personal.embarazo ?? 'N/A'],
                ['Procedencia'],
                [
                    'País',
                    this.paisOptions.find((option) => option.value === this.formPersonaUsuario.personal.pais_id)
                        ?.label ?? 'N/A',
                ],
                [
                    'Cantón',
                    this.cantonOptions.find((option) => option.value === this.formPersonaUsuario.personal.canton_id)
                        ?.label ?? 'N/A',
                ],
                ['Dormitorio'],
                [
                    '¿Dónde Conoció el Dormitorio?',
                    this.contactoDormitorioOptions.find(
                        (option) => option.value === this.formPersonaUsuario.personal.donde_dormi_id,
                    )?.label ?? 'N/A',
                ],
                [
                    'Razón por la que acude al Dormitorio',
                    this.formPersonaUsuario.catalogos.razon_servicio
                        .map((id: string) => this.razonServicioOptions.find((opt) => opt.value === id)?.label)
                        .filter((label: string) => label)
                        .join(', ') || 'N/A',
                ],
                [
                    'Tiempo en Calle',
                    this.tiempoCalleOptions.find(
                        (option) => option.value === this.formPersonaUsuario.personal.tiempo_calle_id,
                    )?.label ?? 'N/A',
                ],
                ['Información Laboral'],
                ['¿Trabaja?', this.formPersonaUsuario.personal.sitrabaja ? 'Sí' : 'No'],
                ['Empresa', this.formPersonaUsuario.personal.empresa ?? 'N/A'],
                ['Ocupación', this.formPersonaUsuario.personal.ocupacion ?? 'N/A'],
                ['Licencias'],
                ['¿Tiene Licencia?', this.formPersonaUsuario.personal.licencia ? 'Sí' : 'No'],
                ['Tipo de Licencia', this.formPersonaUsuario.personal.tipo_licencia ?? 'N/A'],
                ['Observaciones'],
                ['Observación', this.formPersonaUsuario.personal.observacion ?? 'N/A'],
                ['Estado de Salud'],
                ['Tos, Flema o Fiebre', this.formPersonaUsuario.personal.tosflemafiebre ? 'Sí' : 'No'],
                ['Condición Especial', this.formPersonaUsuario.personal.condicionespecial ?? 'N/A'],
                ['¿Tiene Discapacidad?', this.formPersonaUsuario.personal.discapacidad ? 'Sí' : 'No'],
                ['¿Toma Medicación?', this.formPersonaUsuario.personal.medicacion ? 'Sí' : 'No'],
                ['Detalle Medicamento', this.formPersonaUsuario.personal.detallemedicamento ?? 'N/A'],
                ['¿Sabe Leer y Escribir?', this.formPersonaUsuario.personal.leerescribir ? 'Sí' : 'No'],
                ['Nombre Técnico', this.formPersonaUsuario.personal.nombretecnico ?? 'N/A'],
                ['Drogas y Cárcel'],
                ['¿Consume Drogas?', this.formPersonaUsuario.personal.consumodrogas ? 'Sí' : 'No'],
                [
                    'Droga Principal',
                    this.tipoDrogasOptions.find(
                        (option) => option.value === this.formPersonaUsuario.personal.droga_principal,
                    )?.label ?? 'N/A',
                ],
                ['Edad Inicio Drogas', this.formPersonaUsuario.personal.edadiniciodrogas ?? 'N/A'],
                ['Número de Internamientos', this.formPersonaUsuario.personal.numerointernamientos ?? 'N/A'],
                ['¿Ha Estado en la Cárcel?', this.formPersonaUsuario.personal.carcel ? 'Sí' : 'No'],
                ['Razón Cárcel', this.formPersonaUsuario.personal.razoncarcel ?? 'N/A'],
                ['¿Pendiente Resolución?', this.formPersonaUsuario.personal.pendienteresolucion ? 'Sí' : 'No'],
                ['Edad Inicio Cárcel', this.formPersonaUsuario.personal.edadiniciocarcel ?? 'N/A'],
                ['Información para Referencias', ''],
                ['¿Ha Estado en la Cárcel?', this.formPersonaUsuario.info3meses_id.carcel ? 'Sí' : 'No'],
                ['Razón Cárcel', this.formPersonaUsuario.info3meses_id.razoncarcel ?? 'N/A'],
                ['¿Tratamiento Médico?', this.formPersonaUsuario.info3meses_id.tratamiento_medico ? 'Sí' : 'No'],
                ['Razón Tratamiento Médico', this.formPersonaUsuario.info3meses_id.razon_trat ?? 'N/A'],
                ['¿Tratamiento Psiquiátrico?', this.formPersonaUsuario.info3meses_id.tratamiento_psiq ? 'Sí' : 'No'],
                ['Razón Tratamiento Psiquiátrico', this.formPersonaUsuario.info3meses_id.razon_psiq ?? 'N/A'],
                ['¿Tratamiento Drogas?', this.formPersonaUsuario.info3meses_id.tratamiento_drogas ? 'Sí' : 'No'],
                ['Pemsiones'],
                [
                    'Tipo de Pensión',
                    this.formPersonaUsuario.catalogos.pensiones
                        .map((id: string) => this.tipoPensionesOptions.find((opt) => opt.value === id)?.label)
                        .filter((label: string) => label)
                        .join(', ') || 'N/A',
                ],
                [
                    'Razón Servicio',
                    this.razonServicioOptions.find(
                        (option) => option.value === this.formPersonaUsuario.catalogos.razon_servicio[0],
                    )?.label || 'N/A',
                ],
                ['Razón Tratamiento Drogas', this.formPersonaUsuario.info3meses_id.razon_drogas ?? 'N/A'],
                ['Información de Contacto'],
                ['Nombre', this.formPersonaUsuario.contacto.nombre ?? 'N/A'],
                ['Teléfono', this.formPersonaUsuario.contacto.telefono ?? 'N/A'],
                ['Relación', this.formPersonaUsuario.contacto.relacion ?? 'N/A'],
                ['Información INAMU'],
                ['¿Es Jefe de Hogar?', this.formPersonaUsuario.inamu?.jefehogar ? 'Sí' : 'No'],
                ['¿Contacto Familiar?', this.formPersonaUsuario.inamu?.contactofamilia ? 'Sí' : 'No'],
                ['¿Apoyo Económico?', this.formPersonaUsuario.inamu?.apoyoeconomico ? 'Sí' : 'No'],
                ['¿Tiene Pareja?', this.formPersonaUsuario.inamu?.pareja ? 'Sí' : 'No'],
                [
                    '¿Recibe Ayuda de Institución?',
                    this.formPersonaUsuario.catalogos.tipos_ayuda
                        .map((id: string) => this.tipoAyudaOptions.find((opt) => opt.value === id)?.label)
                        .filter((label: string) => label)
                        .join(', ') || 'N/A',
                ],
                [
                    '¿Ha sufrido algun tipo de violencia?',
                    this.formPersonaUsuario.catalogos.tipos_violencia
                        .map((id: string) => this.tipoViolenciaOptions.find((opt) => opt.value === id)?.label)
                        .filter((label: string) => label)
                        .join(', ') || 'N/A',
                ],
                [
                    'Se dirigió a alguna institución de violencia',
                    this.formPersonaUsuario.catalogos.instituciones_violencia
                        .map((id: string) => this.institucionesAyudaOptions.find((opt) => opt.value === id)?.label)
                        .filter((label: string | undefined): label is string => !!label)
                        .join(', ') || 'N/A',
                ],
                ['¿Pareja en el Centro?', this.formPersonaUsuario.inamu?.parejacentro ? 'Sí' : 'No'],
                ['¿Porqué no está en el Centro?', this.formPersonaUsuario.inamu?.parejano ?? 'N/A'],
                ['Detalle Soluciones', this.formPersonaUsuario.inamu?.solucionesdetalle ?? 'N/A'],
            ];
            this.downloadPDF(data, 'reporte.pdf');
        }

        this.showModal = false;
    }

    downloadCSV(data: string[][], filename: string) {
        const csvContent = '\uFEFF' + data.map((e) => e.join(';')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        this.triggerDownload(blob, filename);
    }

    downloadPDF(data: string[][], filename: string) {
        const doc = new jsPDF();
        const lineHeight = 10;
        const marginTop = 10;
        const marginLeft = 10;
        const maxLinesPerPage = Math.floor((doc.internal.pageSize.height - marginTop * 2) / lineHeight);

        let currentLine = 0;

        data.forEach((row, index) => {
            // Verificamos si hay que agregar una nueva página
            if (currentLine >= maxLinesPerPage) {
                doc.addPage();
                currentLine = 0;
            }

            // Identificar si es una fila de encabezado (solo un elemento)
            const isHeader = row.length === 1;

            // Agregar espacio extra antes del header, excepto el primero
            if (isHeader && index !== 0) {
                currentLine += 0.5; // medio espacio antes del header
            }

            const y = marginTop + currentLine * lineHeight;

            if (isHeader) {
                doc.setFont('helvetica', 'bold');
                doc.text(row[0], marginLeft, y);
                doc.setFont('helvetica', 'normal'); // Restaurar a normal para lo que sigue
            } else {
                doc.text(`${row[0]}: ${row[1]}`, marginLeft, y);
            }

            currentLine++;
        });

        doc.save(filename);
    }

    triggerDownload(blob: Blob, filename: string) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }
}
