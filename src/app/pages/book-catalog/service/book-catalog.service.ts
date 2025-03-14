import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookCatalogService {
  private apiUrl = 'http://localhost:8080/book-catalog';

  constructor(private http: HttpClient) { }

  getBookCatalog(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.apiUrl}`);
  }

  createBookCatalog(data: any): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.apiUrl}`, data);
  }

  getDetailBookCatalog(id: number): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.apiUrl}/${id}`);
  }

  updateBookCatalog(id: number, data: any): Observable<ResponseApi> {
    return this.http.put<ResponseApi>(`${this.apiUrl}/${id}`, data);
  }

  deleteBookCatalog(id: number): Observable<ResponseApi> {
    return this.http.delete<ResponseApi>(`${this.apiUrl}/${id}`);
  }
}
