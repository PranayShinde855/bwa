import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs';

export const reverseGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  let token = typeof window != "undefined" && sessionStorage.getItem('token');
  return authService.loggedIn$.pipe(
    take(1),
    map(isloggedIn => {
      if (isloggedIn && token) {
        return router.createUrlTree(['/dashboard']);
      }
      else{
        return true;
      }
    })
  );

  return true;
};
