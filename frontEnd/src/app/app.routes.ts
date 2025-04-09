import { Routes } from '@angular/router';
import { LogComponent } from './asistente/pages/log/log.component';
import { AddPersonComponent } from './asistente/pages/nueva-persona-usuario/nueva-persona-usuario.component';
import { LoginComponent } from './admin/pages/login/login.component';
import { RegisterComponent } from './admin/pages/register/register.component';
import { EditPersonComponent } from './asistente/pages/editar-persona-usuario/editar-persona-usuario.component';
import { ViewPersonComponent } from './asistente/pages/ver-persona-usuario/ver-persona-usuario.component';

export const routes: Routes = [
    {
        path: '',
        component: LogComponent,
    },
    {
        path: 'log',
        component: LogComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'add',
        component: AddPersonComponent,
    },
    {
        path: 'edit/:id',
        component: EditPersonComponent,
    },
    {
        path: 'view',
        component: ViewPersonComponent,
    },
];
