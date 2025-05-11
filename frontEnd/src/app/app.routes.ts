import { Routes } from '@angular/router';
import { LogComponent } from './asistente/pages/log/log.component';
import { AddPersonComponent } from './asistente/pages/nueva-persona-usuario/nueva-persona-usuario.component';
import { LoginComponent } from './admin/pages/login/login.component';
import { RegisterComponent } from './admin/pages/register/register.component';
import { EditPersonComponent } from './asistente/pages/editar-persona-usuario/editar-persona-usuario.component';
import { ViewPersonComponent } from './asistente/pages/ver-persona-usuario/ver-persona-usuario.component';
import { ConsultasComponent } from './admin/pages/consultar/consultas.component';

/* Catálogos */
import { CantonesComponent } from './catalogs/pages/index-cantones/cantones.component';
import { AddCantonComponent } from './catalogs/pages/add-canton/addcanton.component';
import { EditCantonComponent } from './catalogs/pages/edit-canton/editcanton.component';

import { TiposPensionComponent } from './catalogs/pages/index-tipos-pension/tipos-pension.component';
import { TiposIdComponent } from './catalogs/pages/index-tipos-id/tipos-id.component';
import { DondeDurmioComponent } from './catalogs/pages/index-donde-durmio/donde-durmio.component';
import { TiempoCalleComponent } from './catalogs/pages/index-tiempo-calle/tiempo-calle.component';
import { RazonServicioComponent } from './catalogs/pages/index-razon-servicio/razon-servicio.component';
import { ProvinciaComponent } from './catalogs/pages/index-provincias/provincias.component';
import { PaisComponent } from './catalogs/pages/index-paises/paises.component';
import { InstitucionesViolenciaComponent } from './catalogs/pages/index-instituciones-violencia/instituciones-violencia.component';
import { GeneroComponent } from './catalogs/pages/index-generos/generos.component';
import { EstadoCivilComponent } from './catalogs/pages/index-estado-civil/estado-civil.component';
import { GradoAcademicoComponent } from './catalogs/pages/index-grados-academicos/grados-academicos.component';
import { TipoViolenciaComponent } from './catalogs/pages/index-tipos-violencia/tipos-violencia.component';

export const routes: Routes = [
    { path: '', component: LogComponent },
    { path: 'log', component: LogComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'add', component: AddPersonComponent },
    { path: 'edit/:id', component: EditPersonComponent },
    { path: 'view/:id', component: ViewPersonComponent },
    { path: 'consultas', component: ConsultasComponent },

    // Catálogos
    { path: 'cantones', component: CantonesComponent },
    { path: 'nuevo-canton', component: AddCantonComponent },
    { path: 'editar-canton/:id', component: EditCantonComponent },

    { path: 'tipos-pension', component: TiposPensionComponent },
    { path: 'tipos-id', component: TiposIdComponent },
    { path: 'donde-durmio', component: DondeDurmioComponent },
    { path: 'tiempo-calle', component: TiempoCalleComponent },
    { path: 'razones-servicio', component: RazonServicioComponent },
    { path: 'provincias', component: ProvinciaComponent },
    { path: 'paises', component: PaisComponent },
    { path: 'instituciones-violencia', component: InstitucionesViolenciaComponent },
    { path: 'generos', component: GeneroComponent },
    { path: 'estados-civiles', component: EstadoCivilComponent },
    { path: 'grados-academicos', component: GradoAcademicoComponent },
    { path: 'tipos-violencia', component: TipoViolenciaComponent },
];
