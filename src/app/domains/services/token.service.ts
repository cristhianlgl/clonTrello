import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
import { jwtDecode, JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  private keyName: string = 'token-trello';

  save(token: string) {
    setCookie(this.keyName, token, { expires: 365, path: '/' });
  }

  get() {
    return getCookie(this.keyName);
  }

  remove() {
    removeCookie(this.keyName);
  }

  isValid() {
    const token = this.get();
    if (!token) return false;
    const tokenDecode = jwtDecode<JwtPayload>(token);
    if (!tokenDecode || !tokenDecode?.exp) return false;

    const tokenDate = new Date(0);
    const today = new Date();
    tokenDate.setUTCSeconds(tokenDecode?.exp);
    return tokenDate.getTime() > today.getTime();
  }
}
