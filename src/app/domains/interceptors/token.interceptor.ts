import { TokenService } from '@/services/token.service';
import { HttpContext, HttpContextToken, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';

const CHECK_TOKEN = new HttpContextToken<Boolean>(() => false);

export function checkToken() {
  return new HttpContext().set(CHECK_TOKEN, true);
}       

function addAuthHeader(req: HttpRequest<unknown>, next: HttpHandlerFn ) {
  const token = inject(TokenService).get();
  if(token){
    const authRequest = req.clone({
      headers: req.headers.set('Authorization',`Bearer ${token}`)
    })
    return next(authRequest);
  }
  return next(req);
}

export const tokenInterceptor: HttpInterceptorFn = (req, next) => 
  req.context.get(CHECK_TOKEN) 
    ? addAuthHeader(req, next)
    : next(req)
;