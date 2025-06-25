import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuoteService } from '../../services/quote.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quote-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './quote-form.html',
  styleUrl: './quote-form.scss'
})
export class QuoteForm {
  quoteForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private quoteService: QuoteService, private router: Router) {
    this.quoteForm = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(3)]],
      author: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  onSubmit(): void {
    if (this.quoteForm.valid) {
      this.quoteService.addQuote(this.quoteForm.value).subscribe({
        next: () => {
          this.successMessage = 'Citatet har lagts till!';
          this.errorMessage = null;
          this.quoteForm.reset();

          setTimeout(() => {
            this.router.navigate(['/quotes']);
          }, 1500); // delay innan redirect
        },
        error: () => {
          this.successMessage = null;
          this.errorMessage = 'Något gick fel. Försök igen.';
        }
      });
    }
  }
}
