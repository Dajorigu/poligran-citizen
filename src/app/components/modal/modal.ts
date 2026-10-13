import { Component, ElementRef, HostListener, afterNextRender, inject, input, output } from '@angular/core';

/**
 * Ventana modal genérica. El padre decide cuándo existe (con @if);
 * se cierra con la X, haciendo clic fuera o con la tecla Esc.
 */
@Component({
  selector: 'app-modal',
  template: `
    <div class="backdrop" (click)="close.emit()">
      <div class="box" role="dialog" aria-modal="true" tabindex="-1" [attr.aria-label]="label()" (click)="$event.stopPropagation()">
        <button type="button" class="close" aria-label="Cerrar" (click)="close.emit()">×</button>
        <ng-content />
      </div>
    </div>
  `,
  styleUrl: './modal.css',
})
export class Modal {
  /** Nombre accesible de la ventana. */
  label = input('Ventana');
  close = output<void>();

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    // Lleva el foco a la ventana al abrirse.
    afterNextRender(() => this.host.nativeElement.querySelector<HTMLElement>('.box')?.focus());
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.close.emit();
  }
}
