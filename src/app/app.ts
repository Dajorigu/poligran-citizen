import { Component, computed, inject, signal } from '@angular/core';
import { News } from './models/news.model';
import { AuthService } from './services/auth.service';
import { FavoritesService } from './services/favorites.service';
import { NewsService } from './services/news.service';
import { ToastService } from './services/toast.service';
import { ContactForm } from './components/contact-form/contact-form';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { Headline } from './components/headline/headline';
import { LoginForm } from './components/login-form/login-form';
import { Modal } from './components/modal/modal';
import { NewsCard } from './components/news-card/news-card';
import { NewsDetail } from './components/news-detail/news-detail';
import { Toast } from './components/toast/toast';
import { TrendsBar } from './components/trends-bar/trends-bar';

/**
 * Componente raíz: mantiene el estado de la pantalla (filtros, ventanas abiertas)
 * y se lo pasa a los componentes hijos mediante property binding; los hijos
 * responden con eventos (event binding).
 */
@Component({
  selector: 'app-root',
  imports: [Header, TrendsBar, Headline, NewsCard, Footer, Modal, LoginForm, ContactForm, NewsDetail, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly news = inject(NewsService);
  protected readonly favs = inject(FavoritesService);
  private readonly auth = inject(AuthService);
  private readonly toast = inject(ToastService);

  // --- Estado de la interfaz ---
  protected readonly tema = signal<string | null>(null);
  protected readonly onlyFavs = signal(false);
  protected readonly selected = signal<News | null>(null);
  protected readonly loginOpen = signal(false);
  protected readonly contactOpen = signal(false);

  // --- Noticias filtradas por tema y/o favoritos ---
  private readonly visible = computed(() =>
    this.news.noticias().filter(
      (n) =>
        (!this.tema() || n.temas.includes(this.tema()!)) &&
        (!this.onlyFavs() || this.favs.has(n.id)),
    ),
  );
  protected readonly principales = computed(() => this.visible().filter((n) => n.tipo === 'principal'));
  protected readonly secundarias = computed(() => this.visible().filter((n) => n.tipo === 'secundaria'));
  protected readonly destacadas = computed(() => this.visible().filter((n) => n.tipo === 'destacada'));

  protected readonly emptyMessage = computed(() => {
    if (this.news.loading() || this.visible().length > 0) return '';
    return this.onlyFavs()
      ? 'Aún no tienes noticias favoritas con este filtro.'
      : 'No hay noticias para este tema en el prototipo.';
  });

  /** Activa un tema; si ya estaba activo, lo desactiva. */
  protected toggleTema(t: string): void {
    this.tema.update((actual) => (actual === t ? null : t));
  }

  protected onLogin(email: string): void {
    this.auth.login(email);
    this.loginOpen.set(false);
    this.toast.show('Sesión iniciada como ' + email);
  }

  protected onContactSent(): void {
    this.contactOpen.set(false);
    this.toast.show('Mensaje enviado (simulado). ¡Gracias por escribirnos!');
  }
}
