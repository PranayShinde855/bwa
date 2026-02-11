import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // This ensures a single global instance
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  public loggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Update the subject with the actual boolean value passed
  setLoggedInStatus(status: boolean) {
    this.loggedInSubject.next(status);
  }

  login(req: any): Observable<any> {
    return this.http.post('Auth/LoginAsync', req);
  }

  logout(): Observable<any> {
    return this.http.post('Auth/LogoutAsync', {});
  }

  forceLogout() {
    this.setLoggedInStatus(false);
    // Note: logout() returns an observable, usually you'd subscribe if needed
    this.logout().subscribe(); 
    sessionStorage.clear();
    sessionStorage.clear();
  }  
}
