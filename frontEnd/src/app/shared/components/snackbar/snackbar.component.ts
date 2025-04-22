import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  imports: [],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.css'
})
export class SnackbarComponent {
  @Input() message: string = ''; // Mensaje a mostrar
  isVisible: boolean = false; // Controla la visibilidad del Snackbar

  // Método para mostrar el Snackbar
  show(message: string, duration: number = 3000): void {
    this.message = message;
    this.isVisible = true;

    // Ocultar el Snackbar después del tiempo especificado
    setTimeout(() => {
      this.isVisible = false;
    }, duration);
  }
}
