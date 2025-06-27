import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Book } from '../../services/book';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-form',
  standalone: true,
  templateUrl: './book-form.html',
  styleUrl: './book-form.scss',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
})
export class BookForm implements OnInit {
  bookForm: FormGroup;
  successMessage = '';
  errorMessage = '';
  isSubmitting = false;
  allBooks: Book[] = [];

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publishedDate: ['', Validators.required],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: books => this.allBooks = books
    });
  }

  onSubmit(): void {
    if (this.bookForm.invalid || this.isSubmitting) {
      this.errorMessage = 'Please fill in all required fields.';
      this.successMessage = '';
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
      return;
    }

    const newBook: Book = this.bookForm.value;
    const today = new Date().toISOString().split('T')[0]; // Get today's date
    const title = newBook.title.trim().toLowerCase(); // Check if a book with the same title already exists

    if (newBook.publishedDate > today) {
      this.errorMessage = 'Published date cannot be in the future.';
      this.successMessage = '';
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
      return;
    }

    const duplicate = this.allBooks.some(book => book.title.trim().toLowerCase() === title);
    if (duplicate) {
      this.errorMessage = 'A book with this title already exists.';
      this.successMessage = '';
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
      return;
    }

    this.isSubmitting = true;

    this.bookService.addBook(newBook).subscribe({
      next: () => {
        this.successMessage = 'Book added successfully!';
        this.errorMessage = '';
        this.bookForm.reset();
        this.isSubmitting = false;
        setTimeout(() => this.router.navigate(['/books']), 1500);
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (err) => {
        this.errorMessage = 'Failed to add book.';
        this.successMessage = '';
        this.isSubmitting = false;

        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    });
  }
}
