import { Routes } from '@angular/router';
import { LogComponent } from './asistente/pages/log/log.component';
import { AddPersonComponent } from './asistente/pages/nueva-persona-usuario/nueva-persona-usuario.component';
import { LoginComponent } from './admin/pages/login/login.component';
import { RegisterComponent } from './admin/pages/register/register.component';

export const routes: Routes = [
    {
        path: '',
        component: LogComponent
    },
    {
        path: 'log',
        component: LogComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
    path: 'add',
    component: AddPersonComponent,
    },
];
