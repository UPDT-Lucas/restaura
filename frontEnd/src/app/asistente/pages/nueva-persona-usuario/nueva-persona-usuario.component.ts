import { Component } from '@angular/core';
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
}
