import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { equal } from 'assert';
import { request } from 'http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient: HttpClient) { }

  getCounts(): Observable<any> {
    return this.httpClient.post(`Dashboard/GetCountAsync`, '');
  }

   getBlogs(): Observable<any> {
    return this.httpClient.post(`Dashboard/GetBlogAsync`, '');
  }

   getBlogsByCategory(request:any): Observable<any> {
    return this.httpClient.post(`Dashboard/GetBlogAsync`, request);
  }

   getPostPerformanceData(reuest:any): Observable<any> {
    return this.httpClient.post(`Dashboard/GetGraphBlogPostPerformanceAsync`, reuest);
  }
  
  getGraphCategoryPerformance(reuest:any): Observable<any> {
    return this.httpClient.post(`Dashboard/GetGraphCategoryPerformanceAsync`, reuest);
  }
  
  GetUserBlogByCategoryIdAsync(reuest:any): Observable<any> {
    return this.httpClient.post(`Blog/GetUserBlogByCategoryIdAsync`, reuest);
  }

}
