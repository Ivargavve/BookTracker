import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { Book } from '../../services/book';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss'
})
export class BookList implements OnInit {
  books: Book[] = [];

  constructor(
    private bookService: BookService,
    public auth: AuthService  // ← används i templatet för att kolla inloggning
  ) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.bookService.getBooks().subscribe((data) => {
      this.books = data;
    });
  }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe(() => {
      this.books = this.books.filter(book => book.id !== id);
    });
  }

  isValidImageUrl(url: string | null | undefined): boolean {
    return !!url && url.startsWith('data:image/') && url.length > 100;
  }
}
