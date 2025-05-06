import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'shared-confirm-dialog-input',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './confirm-dialog-input.component.html',
  styleUrl: './confirm-dialog-input.component.css'
})
export class ConfirmDialogInputComponent {
  @Input() text: string = '';
  @Input() title: string = '';
  @Input() actionType: 'delete' | 'update' | 'info' | 'add' = 'delete';
  @Input() showInput: boolean = false;
  @Output() confirmed = new EventEmitter<{ confirmed: boolean, value?: string }>(); // Modificado

  inputValue: string = ''; 

  close(value: boolean) {
    this.confirmed.emit({ confirmed: value, value: this.inputValue });
  }

  get confirmButtonClass(): string {
    return {
      delete: 'confirm-btn-delete',
      update: 'confirm-btn-update',
      add: 'confirm-btn-add',
      info: 'confirm-btn-info'
    }[this.actionType];
  }
}
