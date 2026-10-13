import { AbstractControl } from '@angular/forms';

/** Expresión para validar correos: texto@dominio.ext */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Devuelve el mensaje de error de un control, o '' si es válido o aún no fue tocado.
 * @param control Control del formulario reactivo.
 * @param overrides Mensajes propios por tipo de error (ej. { required: '...' }).
 */
export function errorMessage(control: AbstractControl, overrides: Record<string, string> = {}): string {
  if (!control.invalid || !control.touched) return '';
  const errors = control.errors ?? {};
  const key = Object.keys(errors)[0];
  if (overrides[key]) return overrides[key];
  switch (key) {
    case 'required':
      return 'Este campo es obligatorio.';
    case 'pattern':
      return 'Ingresa un correo válido (ej. nombre@dominio.com).';
    case 'minlength':
      return `Debe tener al menos ${errors['minlength'].requiredLength} caracteres.`;
    case 'maxlength':
      return `No puede superar ${errors['maxlength'].requiredLength} caracteres.`;
    default:
      return 'Valor no válido.';
  }
}
