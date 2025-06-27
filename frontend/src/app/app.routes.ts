import { Routes } from '@angular/router';
import { AuthGuard } from './auth-guard'; 

export const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { 
    path: 'books', 
    loadComponent: () => import('./components/book-list/book-list').then(m => m.BookList),
  },
  { 
    path: 'add-book', 
    loadComponent: () => import('./components/book-form/book-form').then(m => m.BookForm),
    canActivate: [AuthGuard] // Protect the route with AuthGuard
  },
  { 
    path: 'update/:id', 
    loadComponent: () => import('./components/update-form/update-form').then(m => m.UpdateForm),
    canActivate: [AuthGuard]
  },
  { 
    path: 'login', 
    loadComponent: () => import('./components/login-form/login-form').then(m => m.LoginForm) 
  },
  { 
    path: 'register',
    loadComponent: () => import('./components/register-form/register-form').then(m => m.RegisterForm) 
  },
  { 
    path: 'quotes', 
    loadComponent: () => import('./components/quote-list/quote-list').then(m => m.QuoteList),
    canActivate: [AuthGuard]
  },
  { 
    path: 'add-quote', 
    loadComponent: () => import('./components/quote-form/quote-form').then(m => m.QuoteForm),
    canActivate: [AuthGuard]
  }
];
