import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCatalogComponent } from './book-catalog.component';
import { Router } from '@angular/router';
import {
  HttpClientTestingModule,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { BookCatalogService } from './service/book-catalog.service';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';

describe('BookCatalogComponent', () => {
  let component: BookCatalogComponent;
  let fixture: ComponentFixture<BookCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCatalogComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('Navigate To Form Book', () => {
  let component: BookCatalogComponent;
  let fixture: ComponentFixture<BookCatalogComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [BookCatalogComponent, HttpClientTestingModule],
      providers: [{ provide: Router, useValue: routerSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(BookCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should navigate to form book', () => {
    component.navigateToFormBook(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/book-catalog/edit'], {
      queryParams: { id: 1 },
    });
  });

  it('should navigate to add-book page if no id is provided', () => {
    component.navigateToFormBook(null);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(
      '/book-catalog/add-book'
    );
  });
});

describe('Retrieve Book Catalog', () => {
  let service: BookCatalogService;
  let component: BookCatalogComponent;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: Router, useValue: routerSpy }, BookCatalogService],
    });

    service = TestBed.inject(BookCatalogService);
    component = new BookCatalogComponent(routerSpy, service);
  });

  it('should retrieve book catalog', () => {
    const response = {
      message: 'Success retrieve data',
      result: [
        {
          id: 1,
          bookCode: 'BC1001',
          title: 'The Great Adventure',
          genre: 'Fiction',
          author: 'John Doe',
          publisher: 'HarperCollins',
          publishDate: '2022-03-15',
          bookStatus: 'Available',
        },
      ],
      code: '00',
    };
    spyOn(service, 'getBookCatalog').and.callFake(() => {
      return of(response);
    });
    component.retrieveBookCatalog();
    expect(component.dataSource.data).toBe(response.result);
  });
});
