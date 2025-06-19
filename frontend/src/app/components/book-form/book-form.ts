import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Book } from '../../services/book';

@Component({
  selector: 'app-book-form',
  standalone: true,
  templateUrl: './book-form.html',
  styleUrl: './book-form.scss',
  imports: [ReactiveFormsModule],  // <-- detta fixar problemet
})
export class BookForm {
  bookForm: FormGroup;

  constructor(private fb: FormBuilder, private bookService: BookService) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publishedDate: ['', Validators.required],
      imageUrl: ['']
    });
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const newBook: Book = this.bookForm.value;
      this.bookService.addBook(newBook).subscribe(() => {
        console.log('Bok tillagd!');
        this.bookForm.reset();
      });
    }
  }
}
