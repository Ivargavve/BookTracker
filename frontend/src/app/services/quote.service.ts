import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quote } from './quote';
import { AuthService } from './auth.service';  // Lägg till denna

@Injectable({ providedIn: 'root' })
export class QuoteService {
  private apiUrl = 'http://localhost:5051/api/quotes';

  constructor(private http: HttpClient, private auth: AuthService) {}

  getQuotes(): Observable<Quote[]> {
    const headers = this.createAuthHeaders();
    return this.http.get<Quote[]>(this.apiUrl, { headers });
  }

  addQuote(quote: Partial<Quote>): Observable<Quote> {
    const headers = this.createAuthHeaders();
    return this.http.post<Quote>(this.apiUrl, quote, { headers });
  }

  deleteQuote(id: number): Observable<void> {
    const headers = this.createAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  private createAuthHeaders(): HttpHeaders {
    const token = this.auth.getToken();
    console.log('JWT Token sent to backend:', token);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }
}
