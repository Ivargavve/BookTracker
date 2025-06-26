import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { Book } from '../../services/book';
import { AuthService } from '../../services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss'
})
export class BookList implements OnInit {
  books: Book[] = [];
  currentUserId: number | null = null;

  constructor(
    private bookService: BookService,
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchBooks();
    this.setCurrentUserId();
  }

  setCurrentUserId(): void {
    const token = this.auth.getToken();
    if (token) {
      try {
        const decoded: any = jwtDecode(token); // extrahera token payload
        this.currentUserId = +decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || +decoded.sub || null;
      } catch (error) {
        console.error('Invalid token', error);
        this.currentUserId = null;
      }
    }
  }

  fetchBooks(): void {
    this.bookService.getBooks().subscribe((data) => {
      this.books = data.reverse();
    });
  }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe(() => {
      this.books = this.books.filter(book => book.id !== id);
    });
  }

goToUpdateForm(bookId: number): void {
  console.log('Navigating to update form for book ID:', bookId); 
  this.router.navigate(['/update', bookId]);
}


  isValidImageUrl(url: string | null | undefined): boolean {
    if (!url) return false;
    const cleanUrl = url.split('?')[0].toLowerCase();
    return (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) &&
          (cleanUrl.endsWith('.jpg') || cleanUrl.endsWith('.jpeg') || cleanUrl.endsWith('.png'));
  }
}
