import { Component, input, output } from '@angular/core';
import { News } from '../../models/news.model';
import { FavoriteButton } from '../favorite-button/favorite-button';

/** Titular principal de la portada. Clic en el título o en "Ver más" abre la noticia. */
@Component({
  selector: 'app-headline',
  imports: [FavoriteButton],
  template: `
    <h2 class="headline">
      <button type="button" class="text" (click)="open.emit(news())">{{ news().titulo }}</button>
      <button type="button" class="more" (click)="open.emit(news())">Ver más</button>
      <app-favorite-button
        [active]="favorite()"
        [label]="news().titulo"
        (toggle)="toggleFavorite.emit(news().id)"
      />
    </h2>
  `,
  styleUrl: './headline.css',
})
export class Headline {
  news = input.required<News>();
  favorite = input(false);
  open = output<News>();
  toggleFavorite = output<number>();
}
