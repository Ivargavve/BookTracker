import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotePage } from './quote-page';

describe('QuotePage', () => {
  let component: QuotePage;
  let fixture: ComponentFixture<QuotePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
