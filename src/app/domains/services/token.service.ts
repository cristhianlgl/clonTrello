import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  private keyName:string = 'token'

  save(token: string){
    localStorage.setItem(this.keyName,token);
  }

  get(){
    return localStorage.getItem(this.keyName)
  }

  remove(){
    localStorage.removeItem(this.keyName)
  }
}
