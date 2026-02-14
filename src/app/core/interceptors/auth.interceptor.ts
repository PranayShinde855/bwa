import { HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };

  const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const clonedReq = req.clone({ setHeaders: headers });
  return next(clonedReq).pipe(
    catchError((error: any) => {
      let errorMsg = '';
      
      if (error.status === 500 || error.status === 400) {
        errorMsg = error.message;
      } else if (error.status === 401) {
        window.sessionStorage.clear();
      }

      window.alert(errorMsg);
      
      return throwError(() => new Error(errorMsg));
    })
  );
};   