import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  imports: [CommonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {
  @Input() 
  text: string = '';
  @Input() 
  title: string = '';
  @Input()
  actionType: 'delete' | 'update' | 'info' | 'add' = 'delete';

  @Output() 
  confirmed = new EventEmitter<boolean>();

  close(value: boolean) {
    this.confirmed.emit(value);
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
