import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private url = "https://api.alikayablog.com.tr";

  constructor(private http: HttpClient) { }
  getPagedArticles(pageNumber: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any>(`${this.url}/api/Article/GetPagedArticles/GetPagedArticles`, { params }).pipe(delay(1000))
  }
  searchArticles(searchTerm: string): Observable<any> {
    const url = `https://api.alikayablog.com.tr/api/Article/SearchArticles/search?searchTerm=${encodeURIComponent(searchTerm)}`;
    return this.http.get<any>(url).pipe(
      catchError(error => {
        console.error('Search error:', error);
        return throwError(() => new Error('Search failed due to server issue'));
      })
    );
  }
}
