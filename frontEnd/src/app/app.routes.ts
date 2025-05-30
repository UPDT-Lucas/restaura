import { Routes } from '@angular/router';

/* General */
import { LogComponent } from './asistente/pages/log/log.component';
import { LoginComponent } from './admin/pages/login/login.component';
import { RegisterComponent } from './admin/pages/register/register.component';
import { AddPersonComponent } from './asistente/pages/nueva-persona-usuario/nueva-persona-usuario.component';
import { EditPersonComponent } from './asistente/pages/editar-persona-usuario/editar-persona-usuario.component';
import { ViewPersonComponent } from './asistente/pages/ver-persona-usuario/ver-persona-usuario.component';
import { ConsultasComponent } from './admin/pages/consultas/consultas.component';

/* Index - Catálogos */
import { CantonesComponent } from './catalogs/pages/index-cantones/cantones.component';
import { DondeDurmiComponent } from './catalogs/pages/index-donde-durmi/donde-dormi.component';
import { DrogasComponent } from './catalogs/pages/index-drogas/drogas.component';
import { EstadoCivilComponent } from './catalogs/pages/index-estados-civiles/estados-civiles.component';
import { GeneroComponent } from './catalogs/pages/index-generos/generos.component';
import { GradoAcademicoComponent } from './catalogs/pages/index-grados-academicos/grados-academicos.component';
import { InstitucionesViolenciaComponent } from './catalogs/pages/index-instituciones-violencia/instituciones-violencia.component';
import { PaisComponent } from './catalogs/pages/index-paises/paises.component';
import { ProvinciaComponent } from './catalogs/pages/index-provincias/provincias.component';
import { RazonServicioComponent } from './catalogs/pages/index-razon-servicio/razon-servicio.component';
import { TiempoCalleComponent } from './catalogs/pages/index-tiempo-calle/tiempo-calle.component';
import { TiposIdComponent } from './catalogs/pages/index-tipos-id/tipos-id.component';
import { TiposAyudaComponent } from './catalogs/pages/index-tipos-ayuda/tipos-ayuda.component';
import { TiposPensionComponent } from './catalogs/pages/index-tipos-pension/tipos-pension.component';
import { TipoViolenciaComponent } from './catalogs/pages/index-tipos-violencia/tipos-violencia.component';
import { CuartosComponent } from './catalogs/pages/index-cuartos/index-cuarto.component';
import { TipoCuartosComponent } from './catalogs/pages/index-tipos-cuartos/tipos-cuartos.component';

/* Add - Catálogos */
import { AddCantonComponent } from './catalogs/pages/add-canton/add-canton.component';
import { AddDondeDurmiComponent } from './catalogs/pages/add-donde-durmi/add-donde-durmi.component';
import { AddDrogaComponent } from './catalogs/pages/add-droga/add-droga.component';
import { AddEstadoCivilComponent } from './catalogs/pages/add-estado-civil/add-estado-civil.component';
import { AddGeneroComponent } from './catalogs/pages/add-genero/add-genero.component';
import { AddGradoAcademicoComponent } from './catalogs/pages/add-grado-academico/add-grado-academico.component';
import { AddInstitucionesViolenciaComponent } from './catalogs/pages/add-instituciones-violencia/add-instituciones-violencia.component';
import { AddPaisComponent } from './catalogs/pages/add-pais/add-pais.component';
import { AddProvinciaComponent } from './catalogs/pages/add-provincia/add-provincia.component';
import { AddRazonServicioComponent } from './catalogs/pages/add-razon-servicio/add-razon-servicio.component';
import { AddTiempoCalleComponent } from './catalogs/pages/add-tiempo-calle/add-tiempo-calle.component';
import { AddTipoIdComponent } from './catalogs/pages/add-tipo-id/add-tipo-id.component';
import { AddTipoAyudaComponent } from './catalogs/pages/add-tipo-ayuda/add-tipo-ayuda.component';
import { AddTipoPensionComponent } from './catalogs/pages/add-tipo-pension/add-tipo-pension.component';
import { AddTipoViolenciaComponent } from './catalogs/pages/add-tipo-violencia/add-tipo-violencia.component';
import { addCuartoComponent } from './catalogs/pages/add-cuarto/add-cuarto.component';
import { AddCamaComponent } from './catalogs/pages/add-cama/add-cama.component';
import { addTipoCuartoComponent } from './catalogs/pages/add-tipo-cuarto/add-tipo-cuarto.component';

/* Edit - Catálogos */
import { EditCantonComponent } from './catalogs/pages/edit-canton/edit-canton.component';
import { EditDondeDurmiComponent } from './catalogs/pages/edit-donde-durmi/edit-donde-durmi.component';
import { EditDrogaComponent } from './catalogs/pages/edit-droga/edit-droga.component';
import { EditEstadoCivilComponent } from './catalogs/pages/edit-estado-civil/edit-estado-civil.component';
import { EditGeneroComponent } from './catalogs/pages/edit-genero/edit-genero.component';
import { EditGradoAcademicoComponent } from './catalogs/pages/edit-grado-academico/edit-grado-academico.component';
import { EditInstitucionesViolenciaComponent } from './catalogs/pages/edit-instituciones-violencia/edit-instituciones-violencia.component';
import { EditPaisComponent } from './catalogs/pages/edit-pais/edit-pais.component';
import { EditProvinciaComponent } from './catalogs/pages/edit-provincia/edit-provincia.component';
import { EditRazonServicioComponent } from './catalogs/pages/edit-razon-servicio/edit-razon-servicio.component';
import { EditTiempoCalleComponent } from './catalogs/pages/edit-tiempo-calle/edit-tiempo-calle.component';
import { EditTipoIdComponent } from './catalogs/pages/edit-tipo-id/edit-tipo-id.component';
import { EditTipoAyudaComponent } from './catalogs/pages/edit-tipo-ayuda/edit-tipo-ayuda.component';
import { EditTipoPensionComponent } from './catalogs/pages/edit-tipo-pension/edit-tipo-pension.component';
import { EditTipoViolenciaComponent } from './catalogs/pages/edit-tipo-violencia/edit-tipo-violencia.component';
import { AgregarPersonaCamaComponent } from './asistente/pages/agregar-persona-cama/agregar-persona-cama.component';
import { AgregarPersonaCuartoComponent } from './asistente/pages/agregar-persona-cuarto/agregar-persona-cuarto.component';
import { EditCuartoComponent } from './catalogs/pages/edit-cuarto/edit-cuarto.component';
import { EditCamaComponent } from './catalogs/pages/edit-cama/edit-cama.component';
import { EditTipoCuartoComponent } from './catalogs/pages/edit-tipo-cuarto/edit-tipo-cuarto.component';

export const routes: Routes = [
    // General
    { path: '', component: LoginComponent },
    { path: 'log', component: LogComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'add', component: AddPersonComponent },
    { path: 'edit/:id', component: EditPersonComponent },
    { path: 'view/:id', component: ViewPersonComponent },
    { path: 'consultas', component: ConsultasComponent },
    { path: 'asignar-cuarto', component: AgregarPersonaCuartoComponent },
    { path: 'asignar-cama/:idCuarto', component: AgregarPersonaCamaComponent },

    // Index
    { path: 'cantones', component: CantonesComponent },
    { path: 'donde-dormi', component: DondeDurmiComponent },
    { path: 'drogas', component: DrogasComponent },
    { path: 'estados-civiles', component: EstadoCivilComponent },
    { path: 'generos', component: GeneroComponent },
    { path: 'grados-academicos', component: GradoAcademicoComponent },
    { path: 'instituciones-violencia', component: InstitucionesViolenciaComponent },
    { path: 'paises', component: PaisComponent },
    { path: 'provincias', component: ProvinciaComponent },
    { path: 'razones-servicio', component: RazonServicioComponent },
    { path: 'tiempo-calle', component: TiempoCalleComponent },
    { path: 'tipos-id', component: TiposIdComponent },
    { path: 'tipos-ayuda', component: TiposAyudaComponent },
    { path: 'tipos-pension', component: TiposPensionComponent },
    { path: 'tipos-violencia', component: TipoViolenciaComponent },
    { path: 'cuartos', component: CuartosComponent },
    { path: 'tipos-cuartos', component: TipoCuartosComponent },

    // Add
    { path: 'nuevo-canton', component: AddCantonComponent },
    { path: 'nuevo-donde-durmi', component: AddDondeDurmiComponent },
    { path: 'nueva-droga', component: AddDrogaComponent },
    { path: 'nuevo-estado-civil', component: AddEstadoCivilComponent },
    { path: 'nuevo-genero', component: AddGeneroComponent },
    { path: 'nuevo-grado-academico', component: AddGradoAcademicoComponent },
    { path: 'nueva-institucion-violencia', component: AddInstitucionesViolenciaComponent },
    { path: 'nuevo-pais', component: AddPaisComponent },
    { path: 'nueva-provincia', component: AddProvinciaComponent },
    { path: 'nueva-razon-servicio', component: AddRazonServicioComponent },
    { path: 'nuevo-tiempo-calle', component: AddTiempoCalleComponent },
    { path: 'nuevo-tipo-id', component: AddTipoIdComponent },
    { path: 'nuevo-tipo-ayuda', component: AddTipoAyudaComponent },
    { path: 'nuevo-tipo-pension', component: AddTipoPensionComponent },
    { path: 'nuevo-tipo-violencia', component: AddTipoViolenciaComponent },
    { path: 'nuevo-cuarto', component: addCuartoComponent },
    { path: 'nueva-cama/:id', component: AddCamaComponent },
    { path: 'nuevo-tipo-cuarto', component: addTipoCuartoComponent },

    // Edit
    { path: 'editar-canton/:id', component: EditCantonComponent },
    { path: 'editar-donde-durmi/:id', component: EditDondeDurmiComponent },
    { path: 'editar-droga/:id', component: EditDrogaComponent },
    { path: 'editar-estado-civil/:id', component: EditEstadoCivilComponent },
    { path: 'editar-genero/:id', component: EditGeneroComponent },
    { path: 'editar-grado-academico/:id', component: EditGradoAcademicoComponent },
    { path: 'editar-institucion-violencia/:id', component: EditInstitucionesViolenciaComponent },
    { path: 'editar-pais/:id', component: EditPaisComponent },
    { path: 'editar-provincia/:id', component: EditProvinciaComponent },
    { path: 'editar-razon-servicio/:id', component: EditRazonServicioComponent },
    { path: 'editar-tiempo-calle/:id', component: EditTiempoCalleComponent },
    { path: 'editar-tipo-id/:id', component: EditTipoIdComponent },
    { path: 'editar-tipo-ayuda/:id', component: EditTipoAyudaComponent },
    { path: 'editar-tipo-pension/:id', component: EditTipoPensionComponent },
    { path: 'editar-tipo-violencia/:id', component: EditTipoViolenciaComponent },
    { path: 'editar-cuarto/:id', component: EditCuartoComponent },
    { path: 'editar-cama/:id', component: EditCamaComponent },
    { path: 'editar-tipo-cuarto/:id', component: EditTipoCuartoComponent}
];
