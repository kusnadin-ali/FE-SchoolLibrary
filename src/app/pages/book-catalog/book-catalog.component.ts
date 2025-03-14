import { Component } from '@angular/core';
import { LayoutComponent } from '../../components/layout/layout.component';
import { SharedModule } from '../../shared/shared.module';

import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BookCatalogService } from './service/book-catalog.service';

export interface BookCatalog {
  title: string;
  bookCode: string;
  genre: string;
  author: string;
  publishDate: string;
  publisher: string;
  bookStatus: string;
  id: number;
}

@Component({
  selector: 'app-book-catalog',
  templateUrl: './book-catalog.component.html',
  styleUrls: ['./book-catalog.component.css'],
  imports: [LayoutComponent, SharedModule],
})
export class BookCatalogComponent {
  displayedColumns: string[] = [
    'no',
    'title',
    'bookCode',
    'genre',
    'author',
    'publishDate',
    'publisher',
    'bookStatus',
    'action',
  ];
  dataSource = new MatTableDataSource<BookCatalog>([]);

  constructor(
    private router: Router,
    private bookCatalogService: BookCatalogService
  ) {
    this.retrieveBookCatalog();
  }

  navigateToFormBook(id: number | null = null) {
    if (id) {
      this.router.navigate(['/book-catalog/edit'], { queryParams: { id: id } });
    } else {
      this.router.navigateByUrl('/book-catalog/add-book');
    }
  }

  retrieveBookCatalog() {
    this.bookCatalogService.getBookCatalog().subscribe({
      next: (response) => {
        if (response.code === '00') {
          this.dataSource.data = response.result;
        }
      },
    });
  }

  deleteCatalogBook(id: number) {
    if(confirm('Apakah anda yakin ingin menghapus data ini?')) {
      this.bookCatalogService.deleteBookCatalog(id).subscribe({
        next: (response) => {
          if (response.code === '00') {
            alert('Berhasil Delete Data');
            this.retrieveBookCatalog();
          }
        },
      });
    }
  }
}
