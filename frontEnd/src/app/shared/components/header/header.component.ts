import { Component } from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'shared-header',
  imports: [
    DropdownComponent,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
