import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  //var token = localStorage.getItem('token');
  //var token = '';
  const headers: Record<string, string> = {
    "content-type": "application/json",
    //"Access-control-allow-origin": "http://localhost:4200/",
    //"Authorization": 'Token'
  };

  debugger
  const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const clonedReq = req.clone({
    setHeaders: headers
  });

  return next(clonedReq);
};
