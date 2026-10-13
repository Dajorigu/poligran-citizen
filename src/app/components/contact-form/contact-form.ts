import { Component, inject, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EMAIL_PATTERN, errorMessage } from '../../utils/form-errors';

type Field = 'nombre' | 'correo' | 'mensaje' | 'acepto';

/** Formulario reactivo de contacto con validaciones. */
@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css',
})
export class ContactForm {
  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly form = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    correo: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
    mensaje: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
    acepto: [false, Validators.requiredTrue],
  });

  /** Se emite cuando el formulario es válido (el envío es simulado). */
  sent = output<void>();

  protected error(name: Field): string {
    const overrides: Record<string, string> =
      name === 'acepto' ? { required: 'Debes aceptar la política de privacidad.' } : {};
    return errorMessage(this.form.controls[name], overrides);
  }

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.sent.emit();
  }
}
