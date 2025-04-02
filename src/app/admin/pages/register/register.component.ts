import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { SearchBoxComponent } from '../../../shared/components/search-box/search-box.component';

@Component({
  selector: 'app-register',
  imports: [
    ButtonComponent,
    SearchBoxComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
