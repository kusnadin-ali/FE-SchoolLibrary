import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from '../../../components/layout/layout.component';
import { SharedModule } from '../../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookCatalogService } from '../service/book-catalog.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-book-catalog',
  imports: [LayoutComponent, SharedModule],
  templateUrl: './form-book-catalog.component.html',
  styleUrl: './form-book-catalog.component.css',
  providers: [provideNativeDateAdapter()],
})
export class FormBookCatalogComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private bookCatalogService: BookCatalogService,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      bookCode: ['', [Validators.required]],
      genre: ['', Validators.required],
      author: ['', Validators.required],
      publishDate: ['', Validators.required],
      publisher: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'] ? +params['id'] : null;
      if (this.id) {
        this.retrieveDetailBookCatalog(this.id);
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.id) {
        this.bookCatalogService.updateBookCatalog(this.id, this.form.value).subscribe({
          next: (response) => {
            if (response.code === '00') {
              alert('Berhasil Update Data');
            }
            console.log(response);
          },
        })
      } else {
        this.bookCatalogService.createBookCatalog(this.form.value).subscribe({
          next: (response) => {
            if (response.code === '00') {
              alert('Berhasil Create Data');
            }
            console.log(response);
          },
        });
      }
    } else {
      console.log('Form is invalid');
    }
  }

  retrieveDetailBookCatalog(id: number) {
    this.bookCatalogService.getDetailBookCatalog(id).subscribe({
      next: (response) => {
        this.form.patchValue({
          title: response.result.title,
          bookCode: response.result.bookCode,
          genre: response.result.genre,
          author: response.result.author,
          publishDate: response.result.publishDate,
          publisher: response.result.publisher,
        });
      },
    });
  }
}
