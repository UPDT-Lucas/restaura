import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'shared-select',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent {
  @Input() label: string = '';
  @Input() options: { value: any; label: string }[] = [];

  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();

  onChange(newValue: any) {
    this.valueChange.emit(newValue);
  }
}
