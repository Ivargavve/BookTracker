import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register-form',
  standalone: true,
  templateUrl: './register-form.html',
  styleUrls: ['./register-form.scss'],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule 
  ],
})
export class RegisterForm {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid || this.isSubmitting) return;

    this.isSubmitting = true;
    const { username, password } = this.registerForm.value;

    this.authService.register(username, password).subscribe({
      next: () => {
        this.successMessage = 'Registration successful!';
        this.errorMessage = '';
        this.registerForm.reset();
        this.isSubmitting = false; 
        this.router.navigate(['/login']);
      },
      error: (err) => {
        const errorResponse = err?.error;

        if (typeof errorResponse === 'string' && errorResponse.toLowerCase().includes('exist')) {
          this.errorMessage = 'Username already exists.';
        } else {
          this.errorMessage = 'Registration failed.';
        }

        this.successMessage = '';
        this.isSubmitting = false;

        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    });
  }
}
