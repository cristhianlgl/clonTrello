import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '@/services/token.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const isValidToken = inject(TokenService).isValid();
  const router = inject(Router);
  if(isValidToken)
    return true;
  return router.createUrlTree(['/login']);
};

export const redirectGuard: CanActivateFn = (route, state) => {
  const isValidToken = inject(TokenService).isValid();
  const router = inject(Router);
  if(isValidToken)
    return router.createUrlTree(['/app/boards']);
  return true;
};
