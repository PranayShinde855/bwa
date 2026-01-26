import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {
private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();
  constructor() { }

    logout(): void {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
  }

   private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

}
