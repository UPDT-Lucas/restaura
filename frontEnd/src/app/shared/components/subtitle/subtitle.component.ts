import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-subtitle',
  templateUrl: './subtitle.component.html',
  styleUrls: ['./subtitle.component.css'],
})
export class SubtitleComponent {
  @Input() text: string = '';
}
