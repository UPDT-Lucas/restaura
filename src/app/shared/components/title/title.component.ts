import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css'],
})
export class TitleOneComponent {
  @Input() text: string = '';
}
