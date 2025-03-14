import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private apiUrl = 'http://localhost:8080/members';

  constructor(private http: HttpClient) { }

  getMembers(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.apiUrl}`);
  }

  createMembers(data: any): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.apiUrl}`, data);
  }

  getDetailMembers(id: number): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.apiUrl}/${id}`);
  }

  updateMembers(id: number, data: any): Observable<ResponseApi> {
    return this.http.put<ResponseApi>(`${this.apiUrl}/${id}`, data);
  }

  deleteMembers(id: number): Observable<ResponseApi> {
    return this.http.delete<ResponseApi>(`${this.apiUrl}/${id}`);
  }
}
