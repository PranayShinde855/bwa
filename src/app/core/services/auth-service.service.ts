import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
private isLoggedInSubject = new BehaviorSubject<boolean>(false);
isLoggedIn$ = this.isLoggedInSubject.asObservable();
  constructor() { }
}
