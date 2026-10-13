import { Injectable, signal } from '@angular/core';

/** Mensajes breves de confirmación (se ocultan solos a los 2,8 s). */
@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly message = signal('');
  private timer?: ReturnType<typeof setTimeout>;

  show(text: string): void {
    this.message.set(text);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.message.set(''), 2800);
  }
}
