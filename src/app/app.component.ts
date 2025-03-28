import { Component } from '@angular/core';
import { HeaderComponent } from './shared/components/header/header.component';
import { DropdownComponent } from "./shared/components/dropdown/dropdown.component";


@Component({
  selector: 'app-root',
  imports: [HeaderComponent, DropdownComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'restaura-app';
}
