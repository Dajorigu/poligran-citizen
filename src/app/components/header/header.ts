import { Component, inject, output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { ToastService } from '../../services/toast.service';

/** Encabezado: botón de sesión, interruptor de tema y título (enlace al inicio). */
@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  protected readonly auth = inject(AuthService);
  protected readonly theme = inject(ThemeService);
  private readonly toast = inject(ToastService);

  /** Pide abrir el formulario de inicio de sesión. */
  loginClick = output<void>();

  protected onSession(): void {
    if (this.auth.loggedIn()) {
      this.auth.logout();
      this.toast.show('Sesión cerrada.');
    } else {
      this.loginClick.emit();
    }
  }
}
