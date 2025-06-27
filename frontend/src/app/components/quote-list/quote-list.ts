import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteService } from '../../services/quote.service';
import { Quote } from '../../services/quote';
import { AuthService } from '../../services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-quote-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quote-list.html',
  styleUrl: './quote-list.scss'
})
export class QuoteList implements OnInit {
  quotes: Quote[] = [];
  paginatedQuotes: Quote[] = [];
  currentUserId: number | null = null;

  currentPage: number = 1;
  quotesPerPage: number = 5;
  totalPages: number = 1;

  constructor(private quoteService: QuoteService, private auth: AuthService) {}

  ngOnInit(): void {
    this.setCurrentUserId();
    this.loadQuotes();
  }

  setCurrentUserId(): void {
    const token = this.auth.getToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      this.currentUserId = +decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || +decoded.sub || null;
    }
  }

  loadQuotes(): void {
    this.quoteService.getQuotes().subscribe((data) => {
      this.quotes = data.reverse();
      this.totalPages = Math.ceil(this.quotes.length / this.quotesPerPage);
      this.updatePaginatedQuotes();
    });
  }

  updatePaginatedQuotes(): void {
    const start = (this.currentPage - 1) * this.quotesPerPage;
    const end = start + this.quotesPerPage;
    this.paginatedQuotes = this.quotes.slice(start, end);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedQuotes();
    }
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  prevPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  get totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }

  deleteQuote(id: number): void {
    this.quoteService.deleteQuote(id).subscribe(() => {
      this.quotes = this.quotes.filter(q => q.id !== id);
      this.totalPages = Math.ceil(this.quotes.length / this.quotesPerPage);
      if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
      this.updatePaginatedQuotes();
    });
  }
}
