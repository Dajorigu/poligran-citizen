import { Component, computed, input } from '@angular/core';
import { News } from '../../models/news.model';

/** Contenido de la ventana de detalle: imagen, título y párrafos de la noticia. */
@Component({
  selector: 'app-news-detail',
  template: `
    @if (news().imagen) {
      <img [src]="news().imagen" [alt]="news().titulo" />
    }
    <h2>{{ news().titulo }}</h2>
    @for (p of paragraphs(); track $index) {
      <p>{{ p }}</p>
    } @empty {
      <p class="empty">El contenido completo de esta noticia aún no está disponible en el prototipo.</p>
    }
  `,
  styleUrl: './news-detail.css',
})
export class NewsDetail {
  news = input.required<News>();

  /** Usa `contenido` si existe; si no, el resumen; si tampoco hay, queda vacío. */
  protected readonly paragraphs = computed(() => {
    const n = this.news();
    return n.contenido?.length ? n.contenido : n.resumen ? [n.resumen] : [];
  });
}
