import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  templateUrl: './login-form.html',
  styleUrls: ['./login-form.scss'],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule
  ],
})
export class LoginForm {
  loginForm: FormGroup;
  errorMessage: string = '';
  showPassword: boolean = false;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.invalid || this.isSubmitting) {
      this.errorMessage = 'Please fill in all required fields.';
      setTimeout(() => this.errorMessage = '', 3000);
      return;
    }

    this.isSubmitting = true;
    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token); 
        this.isSubmitting = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        const errorText = typeof err.error === 'string' ? err.error.toLowerCase() : '';

        if (errorText.includes('invalid') || errorText.includes('wrong')) {
          this.errorMessage = 'Wrong username or password.';
        } else if (errorText.includes('not found')) {
          this.errorMessage = 'User not found.';
        } else {
          this.errorMessage = 'Login failed.';
        }

        this.isSubmitting = false;
        setTimeout(() => this.errorMessage = '', 3000);
      }
    });
  }

}
