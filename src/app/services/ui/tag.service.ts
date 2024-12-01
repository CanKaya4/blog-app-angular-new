import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private url = 'https://api.alikayablog.com.tr/api/Tag'

  constructor(private http: HttpClient) { }

  getAllTag(): Observable<any[]> {
    return this.http.get<any>(`${this.url}/GetAllTags`)
  }
}
