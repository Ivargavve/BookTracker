import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuoteService } from '../../services/quote.service';
import { Router } from '@angular/router';
import { Quote } from '../../services/quote';

@Component({
  selector: 'app-quote-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './quote-form.html',
  styleUrl: './quote-form.scss'
})
export class QuoteForm implements OnInit {
  quoteForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isSubmitting = false;
  allQuotes: Quote[] = [];

  constructor(
    private fb: FormBuilder,
    private quoteService: QuoteService,
    private router: Router
  ) {
    this.quoteForm = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(3)]],
      author: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit(): void {
    this.quoteService.getQuotes().subscribe({
      next: (quotes) => (this.allQuotes = quotes)
    });
  }

  onSubmit(): void {
    if (this.quoteForm.invalid || this.isSubmitting) {
      const textCtrl = this.quoteForm.get('text');
      const authorCtrl = this.quoteForm.get('author');

      if (textCtrl?.errors?.['required'] || authorCtrl?.errors?.['required']) {
        this.setError('All fields are required.');
      } else if (textCtrl?.errors?.['minlength']) {
        this.setError('Quote must be at least 3 characters long.');
      } else if (authorCtrl?.errors?.['minlength']) {
        this.setError('Author must be at least 2 characters long.');
      } else {
        this.setError('Invalid input.');
      }

      return;
    }

    const { text, author } = this.quoteForm.value;
    const newText = text.trim().toLowerCase();

    const duplicate = this.allQuotes.some(q => q.text.trim().toLowerCase() === newText);
    if (duplicate) {
      this.setError('This quote already exists.');
      return;
    }

    this.isSubmitting = true;

    this.quoteService.addQuote({ text, author }).subscribe({
      next: () => {
        this.successMessage = 'Quote added!';
        this.errorMessage = null;
        this.quoteForm.reset();
        this.isSubmitting = false;

        setTimeout(() => this.router.navigate(['/quotes']), 1500);
      },
      error: () => {
        this.setError('Something went wrong, try again.');
        this.isSubmitting = false;
      }
    });
  }

  private setError(message: string): void {
    this.errorMessage = message;
    this.successMessage = null;

    setTimeout(() => {
      this.errorMessage = null;
    }, 3000);
  }
}
