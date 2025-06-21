import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'book-tracker';

  constructor(public auth: AuthService) {}

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn;
  }

  logout(): void {
    this.auth.logout();
  }
}
