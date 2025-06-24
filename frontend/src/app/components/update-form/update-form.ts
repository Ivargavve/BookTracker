import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../services/book';

@Component({
  selector: 'app-update-form',
  standalone: true,
  templateUrl: './update-form.html',
  styleUrls: ['./update-form.scss'],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ]
})
export class UpdateForm implements OnInit {
  updateForm: FormGroup;
  bookId!: number;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publishedDate: ['', Validators.required],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    this.bookId = +this.route.snapshot.paramMap.get('id')!;
    this.bookService.getBook(this.bookId).subscribe({
      next: (book: Book) => {
        this.updateForm.patchValue({
          title: book.title,
          author: book.author,
          publishedDate: book.publishedDate?.substring(0, 10), // ISO-format för input type="date"
          imageUrl: book.imageUrl
        });
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Could not load the book.';
      }
    });
  }

  onSubmit(): void {
    if (this.updateForm.valid) {
      const updatedBook: Book = {
        id: this.bookId,
        ...this.updateForm.value
      };

      this.bookService.updateBook(this.bookId, updatedBook).subscribe({
        next: () => {
          this.successMessage = 'Book updated successfully!';
          this.errorMessage = '';
          setTimeout(() => this.router.navigate(['/books']), 1500);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Failed to update book.';
          this.successMessage = '';
        }
      });
    } else {
      this.errorMessage = 'Please fill in all required fields.';
      this.successMessage = '';
    }
  }
}
