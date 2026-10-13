import { Injectable, effect, signal } from '@angular/core';
import { readStorage, writeStorage } from '../utils/storage';

export type ThemeMode = 'light' | 'dark';
const KEY = 'pc:theme';

/** Modo claro/oscuro: aplica data-theme en <html> y recuerda la elección. */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly mode = signal<ThemeMode>(
    readStorage<ThemeMode | null>(KEY, null) ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  );

  constructor() {
    effect(() => {
      document.documentElement.dataset['theme'] = this.mode();
      writeStorage(KEY, this.mode());
    });
  }

  toggle(): void {
    this.mode.update((m) => (m === 'dark' ? 'light' : 'dark'));
  }
}
