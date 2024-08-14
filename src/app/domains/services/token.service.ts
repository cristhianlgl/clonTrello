import { inject, Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
import { jwtDecode, JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() { }

  private nameAccessToken: string = 'token-trello';
  private nameRefreshToken: string = 'refresh-token-trello';

  saveAccess(token: string) {
    setCookie(this.nameAccessToken, token, { expires: 365, path: '/' });
  }

  saveRefresh(token: string) {
    setCookie(this.nameRefreshToken, token, { expires: 365, path: '/' });
  }

  getAccess() {
    return getCookie(this.nameAccessToken);
  }

  getRefresh() {
    return getCookie(this.nameRefreshToken);
  }

  removeAccess() {
    removeCookie(this.nameAccessToken);
  }

  removeRefresh() {
    removeCookie(this.nameRefreshToken);
  }

  isValidAccessToken = () =>
    this.isValid(this.getAccess())

  isValidRefreshToken = () =>
    this.isValid(this.getRefresh())

  private isValid(token: string | undefined) {
    if (!token) return false;
    const tokenDecode = jwtDecode<JwtPayload>(token);
    if (!tokenDecode || !tokenDecode?.exp) return false;

    const tokenDate = new Date(0);
    const today = new Date();
    tokenDate.setUTCSeconds(tokenDecode?.exp);
    let isTokenValid:boolean = tokenDate.getTime() > today.getTime();
    if(!isTokenValid)
    {
      this.removeAccess();
      this.removeRefresh();
    }
    return isTokenValid ;
  }
}
