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
  currentUserId: number | null = null;

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
      this.quotes = data.reverse().slice(0, 5); // visa senaste 5
    });
  }

  deleteQuote(id: number): void {
    this.quoteService.deleteQuote(id).subscribe(() => {
      this.quotes = this.quotes.filter(q => q.id !== id);
    });
  }
}
