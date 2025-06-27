import { Component, OnInit, HostListener } from '@angular/core';
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
  paginatedBooks: Book[] = [];
  currentUserId: number | null = null;
  openedDropdownId: number | null = null;

  currentPage = 1;
  booksPerPage = 10;
  totalPages = 1;
  totalPagesArray: number[] = [];

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
        const decoded: any = jwtDecode(token);
        this.currentUserId = +decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || +decoded.sub || null;
        // Extract user ID from JWT, fallback if claim not found
      } catch (error) {
        this.currentUserId = null;
      }
    }
  }

  fetchBooks(): void {
    this.bookService.getBooks().subscribe((data) => {
      this.books = data.reverse();
      this.updatePagination();
    });
  }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe(() => {
      this.books = this.books.filter(book => book.id !== id);
      this.updatePagination();
    });
  }

  goToUpdateForm(bookId: number): void {
    this.router.navigate(['/update', bookId]);
    this.openedDropdownId = null;
  }

  toggleDropdown(bookId: number): void {
    this.openedDropdownId = this.openedDropdownId === bookId ? null : bookId;
  }

  @HostListener('document:click', ['$event']) // Close pen dropdown if user clicks outside of it
  handleOutsideClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-dropdown')) {
      this.openedDropdownId = null;
    }
  }

  isValidImageUrl(url: string | null | undefined): boolean {
    if (!url) return false;
    const cleanUrl = url.split('?')[0].toLowerCase();
    return (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) &&
          (cleanUrl.endsWith('.jpg') || cleanUrl.endsWith('.jpeg') || cleanUrl.endsWith('.png'));
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.books.length / this.booksPerPage);
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    const start = (this.currentPage - 1) * this.booksPerPage;
    const end = start + this.booksPerPage;
    this.paginatedBooks = this.books.slice(start, end);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }
}
