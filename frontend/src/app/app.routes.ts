import { Routes } from '@angular/router';
import { BookForm } from './components/book-form/book-form';

export const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', loadComponent: () => import('./components/book-list/book-list').then(m => m.BookList) },
  { path: 'add-book', loadComponent: () => import('./components/book-form/book-form').then(m => m.BookForm) }
];
