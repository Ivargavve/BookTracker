import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const loggedIn = !!localStorage.getItem('token'); // Eller vad du nu använder för auth-check

    if (!loggedIn) {
      this.router.navigate(['/login']); // Skicka till login om inte inloggad
      return false;
    }
    return true;
  }
}
