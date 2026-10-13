import { Injectable, computed, signal } from '@angular/core';
import { readStorage, writeStorage } from '../utils/storage';

const KEY = 'pc:favoritos';

/** Gestiona los ids de noticias favoritas y los persiste en localStorage. */
@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly ids = signal<number[]>(readStorage<number[]>(KEY, []));
  readonly count = computed(() => this.ids().length);

  has(id: number): boolean {
    return this.ids().includes(id);
  }

  /** Agrega o quita una noticia de favoritos. */
  toggle(id: number): void {
    this.ids.update((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]));
    writeStorage(KEY, this.ids());
  }
}
