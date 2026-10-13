import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast.service';

/** Muestra el mensaje actual del ToastService en la parte inferior. */
@Component({
  selector: 'app-toast',
  template: `<div class="toast" [class.show]="toast.message()" role="status" aria-live="polite">{{ toast.message() }}</div>`,
  styleUrl: './toast.css',
})
export class Toast {
  protected readonly toast = inject(ToastService);
}
