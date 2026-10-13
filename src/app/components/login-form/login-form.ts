import { Component, inject, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EMAIL_PATTERN, errorMessage } from '../../utils/form-errors';

/** Formulario reactivo de inicio de sesión con validaciones. */
@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  /** Se emite con el correo cuando el formulario es válido. */
  submitted = output<string>();

  protected error(name: 'email' | 'password'): string {
    return errorMessage(this.form.controls[name]);
  }

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // muestra todos los errores a la vez
      return;
    }
    this.submitted.emit(this.form.getRawValue().email.trim());
  }
}
