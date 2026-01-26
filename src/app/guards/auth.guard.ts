import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.loggedIn$.pipe(
    take(1),
    map(isLoggedIn => {
      let token = typeof window != "undefined" && sessionStorage.getItem('token');
      if (isLoggedIn && token) {
        return true;
      } else {
        return router.createUrlTree(['/login']);
      }
    })
  );
};
