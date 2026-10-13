/** Posición que ocupa la noticia en la pantalla Home. */
export type NewsType = 'principal' | 'secundaria' | 'destacada';

/** Una noticia tal como viene en public/data/noticias.json. */
export interface News {
  id: number;
  tipo: NewsType;
  titulo: string;
  resumen: string;
  /** Párrafos de la noticia completa (opcional). */
  contenido?: string[];
  imagen: string | null;
  /** Temas de la barra de tendencias a los que pertenece. */
  temas: string[];
}

/** Estructura completa del archivo JSON. */
export interface NewsData {
  temas: string[];
  noticias: News[];
}
