import { Injectable } from '@angular/core';
import { listRequest } from '../../sharedModule/models/listRequest';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogUpdateRequest } from '../../sharedModule/models/BlogMoels/BlogUpdateRequest';
import { BlogAddRequest } from '../../sharedModule/models/BlogMoels/BlogAddRequest';
import { BlogDeleteRequest } from '../../sharedModule/models/BlogMoels/BlogDeleteRequest';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private httpClient: HttpClient) { }

    get(request: listRequest): Observable<any>{      
      return this.httpClient.post('Blog/GetAsync', request);
    }
  
     getById(request: any): Observable<any>{
      return this.httpClient.post('Blog/GetByIdAsync', request);
    }
  
     Add(request: BlogAddRequest): Observable<any>{
      return this.httpClient.post('Blog/AddAsync', request);
    }
  
     update(request: BlogUpdateRequest): Observable<any>{

      return this.httpClient.post('Blog/UpdateAsync', request);
    }
  
     delete(request: BlogDeleteRequest): Observable<any>{
      return this.httpClient.post('Blog/DeleteAsync', request);
    }

     getUserBlogById(request: any): Observable<any>{
      return this.httpClient.post('Blog/GetUserBlogByIdAsync', request);
    }
}
