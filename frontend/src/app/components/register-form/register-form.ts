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
    if (this.registerForm.valid) {
      const { username, password } = this.registerForm.value;
      this.authService.register(username, password).subscribe({
        next: () => {
          console.log('Registration succeeded for user:', username);
          this.successMessage = 'Registration successful!';
          this.errorMessage = '';
          this.registerForm.reset();
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log('Registration failed for user:', username);
          this.errorMessage = 'Registration failed';
          this.successMessage = '';
          console.error(err);
        }
      });
    } else {
      this.errorMessage = 'Please fill in all required fields.';
      this.successMessage = '';
    }
  }
}
