import { Component } from '@angular/core';
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
export class BookForm {
  bookForm: FormGroup;

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

  onSubmit(): void {
    console.log('onSubmit called');
    if (this.bookForm.valid) {
      const newBook: Book = this.bookForm.value;
      console.log('Submitting book:', newBook);
      this.bookService.addBook(newBook).subscribe(() => {
        this.bookForm.reset();
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
