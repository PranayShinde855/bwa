import { HttpInterceptorFn } from '@angular/common/http';

export const baseURLInterceptor: HttpInterceptorFn = (req, next) => {
   const baseUrl = "https://localhost:44342/api/";
  if (!req.url.startsWith('https')) {
    const updated = req.clone({
      url: baseUrl + req.url
    });
    return next(updated);
  }
  return next(req);
};
