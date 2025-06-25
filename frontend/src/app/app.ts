import { Component, OnInit } from '@angular/core';
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
export class App implements OnInit {
  protected title = 'book-tracker';
  public currentTheme: 'light' | 'dark' = 'light';

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    this.currentTheme = savedTheme || 'light';
    this.applyTheme();
  }

  toggleTheme(): void {
    console.log('Theme toggled to', this.currentTheme);
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.currentTheme);
    this.applyTheme();
  }

  applyTheme(): void {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(this.currentTheme);
  }

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn;
  }

  logout(): void {
    this.auth.logout();
  }
}
