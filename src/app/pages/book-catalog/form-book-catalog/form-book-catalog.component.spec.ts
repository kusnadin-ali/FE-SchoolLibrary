import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBookCatalogComponent } from './form-book-catalog.component';

describe('FormBookCatalogComponent', () => {
  let component: FormBookCatalogComponent;
  let fixture: ComponentFixture<FormBookCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormBookCatalogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormBookCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
