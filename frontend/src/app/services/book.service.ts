import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = `${environment.apiUrl}/books`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl); // Fetch all books
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`); // Fetch a single book by ID
  }

  addBook(book: Book): Observable<Book> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<Book>(this.apiUrl, book, { headers }); // Add a new book
  }

  updateBook(id: number, book: Book): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${this.apiUrl}/${id}`, book, { headers }); // Update an existing book
  }

  deleteBook(id: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers }); // Delete a book by ID
  }
}
