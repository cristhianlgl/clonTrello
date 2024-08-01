import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '@/services/token.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const token = inject(TokenService).get();
  const router = inject(Router);
  if(token)
    return true;
  return router.createUrlTree(['/login']);
};

export const redirectGuard: CanActivateFn = (route, state) => {
  const token = inject(TokenService).get();
  const router = inject(Router);
  if(token)
    return router.createUrlTree(['/app/boards']);
  return true;
};