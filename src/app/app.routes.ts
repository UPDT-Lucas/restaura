import { Routes } from '@angular/router';
import { LogComponent } from './asistente/pages/log/log.component';
import { LoginComponent } from './admin/pages/login/login.component';
import { RegisterComponent } from './admin/pages/register/register.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'log',
        component: LogComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    }
];
