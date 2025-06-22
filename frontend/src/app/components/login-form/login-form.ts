import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  templateUrl: './login-form.html',
  styleUrls: ['./login-form.scss'],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
})
export class LoginForm {
  loginForm: FormGroup;
  errorMessage: string = '';
  showPassword: boolean = false;

  

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
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);  // Spara token här
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Login error:', err);
          this.errorMessage = 'Login failed: ' + (err.error?.message || 'Unknown error');
          console.error(err);
        }
      });
    }
  }
}
