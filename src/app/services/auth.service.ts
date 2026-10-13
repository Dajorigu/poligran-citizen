import { Injectable, computed, signal } from '@angular/core';
import { readStorage, writeStorage } from '../utils/storage';

const KEY = 'pc:usuario';

/** Sesión simulada (no hay backend): solo guarda el correo en localStorage. */
@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly user = signal<{ email: string } | null>(readStorage(KEY, null));
  readonly loggedIn = computed(() => this.user() !== null);

  login(email: string): void {
    this.user.set({ email });
    writeStorage(KEY, this.user());
  }

  logout(): void {
    this.user.set(null);
    writeStorage(KEY, null);
  }
}
