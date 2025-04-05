import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() text: string = '';
}
