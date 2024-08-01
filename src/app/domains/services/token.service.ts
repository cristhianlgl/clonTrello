import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  private keyName:string = 'token-trello'

  save(token: string){
    setCookie(this.keyName,token, { expires: 365, path: '/'});
  }

  get(){
    return getCookie(this.keyName)
  }

  remove(){
    removeCookie(this.keyName)
  }
}
