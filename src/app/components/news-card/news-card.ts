import { Component, input, output } from '@angular/core';
import { News } from '../../models/news.model';
import { FavoriteButton } from '../favorite-button/favorite-button';

/** Tarjeta de noticia (secundaria o destacada): imagen, título, resumen y "Ver más". */
@Component({
  selector: 'app-news-card',
  imports: [FavoriteButton],
  templateUrl: './news-card.html',
  styleUrl: './news-card.css',
})
export class NewsCard {
  news = input.required<News>();
  favorite = input(false);
  /** Hace la imagen más alargada (noticia destacada). */
  large = input(false);

  open = output<News>();
  toggleFavorite = output<number>();
}
