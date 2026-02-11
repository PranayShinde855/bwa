import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogtypeService {

  constructor(private http: HttpClient) { }

  getAsync(): Observable<any> {
    return this.http.post('BlogType/GetBlogTypesAsync', {});
  }
}
