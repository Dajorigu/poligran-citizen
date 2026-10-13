import { Component, input, output } from '@angular/core';

/** Barra "Tendencias": temas filtrables y botón para ver solo favoritos. */
@Component({
  selector: 'app-trends-bar',
  templateUrl: './trends-bar.html',
  styleUrl: './trends-bar.css',
})
export class TrendsBar {
  temas = input.required<string[]>();
  selected = input<string | null>(null);
  onlyFavorites = input(false);
  favoritesCount = input(0);

  selectTema = output<string>();
  toggleFavorites = output<void>();
}
