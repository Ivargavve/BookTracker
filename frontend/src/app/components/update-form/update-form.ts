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
  isSubmitting = false;

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
          publishedDate: book.publishedDate?.substring(0, 10),
          imageUrl: book.imageUrl
        });
      },
      error: () => {
        this.errorMessage = 'Could not load the book.';
        setTimeout(() => this.errorMessage = '', 3000);
      }
    });
  }

  onSubmit(): void {
    if (this.updateForm.invalid || this.isSubmitting) {
      this.errorMessage = 'Please fill in all required fields.';
      this.successMessage = '';
      setTimeout(() => this.errorMessage = '', 3000);
      return;
    }

    this.isSubmitting = true;

    const updatedBook: Book = {
      id: this.bookId,
      ...this.updateForm.value
    };

    this.bookService.updateBook(this.bookId, updatedBook).subscribe({
      next: () => {
        this.successMessage = 'Book updated successfully!';
        this.errorMessage = '';
        this.isSubmitting = false;
        setTimeout(() => this.router.navigate(['/books']), 1500);
      },
      error: () => {
        this.errorMessage = 'Failed to update book.';
        this.successMessage = '';
        this.isSubmitting = false;
        setTimeout(() => this.errorMessage = '', 3000);
      }
    });
  }
}
