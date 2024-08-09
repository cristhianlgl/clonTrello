import { AuthService } from '@/services/auth.service';
import { TokenService } from '@/services/token.service';
import { HttpContext, HttpContextToken, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

const CHECK_TOKEN = new HttpContextToken<Boolean>(() => false);
const tokenServices = inject(TokenService);

export function checkToken() {
  return new HttpContext().set(CHECK_TOKEN, true);
}

function updateAccessTokenAndRefreshToken(req: HttpRequest<unknown>, next: HttpHandlerFn):Observable<HttpEvent<unknown>> {
  const refreshToken = tokenServices.getRefresh();
  const authService = inject(AuthService)
  const isValidRefreshToken = tokenServices.isValidRefreshToken();
  if(refreshToken && isValidRefreshToken){
    return authService.refreshToken(refreshToken)
    .pipe(
      switchMap(() => addAuthHeader(req, next))
    );
  }
  return next(req);
}

function addAuthHeader(req: HttpRequest<unknown>, next: HttpHandlerFn):Observable<HttpEvent<unknown>> {
  // const isValidToken = tokenServices.isValidAccessToken();
  // if (isValidToken) {
  //   const authRequest = req.clone({
  //     headers: req.headers.set('Authorization', `Bearer ${tokenServices.getAccess()}`)
  //   })
  //   return next(authRequest);
  // }
  // return updateAccessTokenAndRefreshToken(req, next);
  return next(req);
}

export const tokenInterceptor: HttpInterceptorFn = (req, next) =>
  req.context.get(CHECK_TOKEN)
    ? addAuthHeader(req, next)
    : next(req)