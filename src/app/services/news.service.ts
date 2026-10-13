import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { News, NewsData } from '../models/news.model';

/** Carga las noticias y los temas desde el JSON y los expone como signals. */
@Injectable({ providedIn: 'root' })
export class NewsService {
  private readonly http = inject(HttpClient);

  readonly temas = signal<string[]>([]);
  readonly noticias = signal<News[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  constructor() {
    this.load();
  }

  /** Lee data/noticias.json (ruta relativa para funcionar también en GitHub Pages). */
  private load(): void {
    this.http.get<NewsData>('data/noticias.json').subscribe({
      next: (data) => {
        this.temas.set(data.temas);
        this.noticias.set(data.noticias);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar las noticias.');
        this.loading.set(false);
      },
    });
  }
}
