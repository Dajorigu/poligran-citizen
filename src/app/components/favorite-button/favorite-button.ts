import { Component, input, output } from '@angular/core';

/** Botón de corazón reutilizable. Es "tonto": recibe el estado y emite el clic. */
@Component({
  selector: 'app-favorite-button',
  template: `
    <button
      type="button"
      class="fav"
      [class.on]="active()"
      [attr.aria-pressed]="active()"
      [attr.aria-label]="(active() ? 'Quitar de favoritos: ' : 'Agregar a favoritos: ') + label()"
      (click)="toggle.emit()"
    >
      {{ active() ? '♥' : '♡' }}
    </button>
  `,
  styleUrl: './favorite-button.css',
})
export class FavoriteButton {
  /** true si la noticia ya es favorita. */
  active = input.required<boolean>();
  /** Título de la noticia (para el texto accesible). */
  label = input.required<string>();
  toggle = output<void>();
}
