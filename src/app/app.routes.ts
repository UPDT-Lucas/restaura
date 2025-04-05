import { Routes } from '@angular/router';
import { LogComponent } from './asistente/pages/log/log.component';
import { AddPersonComponent } from './asistente/pages/nueva-persona-usuario/nueva-persona-usuario.component';

export const routes: Routes = [
  {
    path: '',
    component: LogComponent,
  },
  {
    path: 'nueva-persona-usuario',
    component: AddPersonComponent,
  },
];
