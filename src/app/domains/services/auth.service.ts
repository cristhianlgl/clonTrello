import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post(`${environment.API_URL}/auth/login`, { email, password })
  }

  register(name: string, email: string, password: string) {
    return this.http.post(`${environment.API_URL}/auth/register`, { name, email, password })
  }

  registerAndLogin(name: string, email: string, password: string){
    return this.register(name, email, password).pipe(
      switchMap(() => this.login(email, password))
    )
  }

  isAvailable(email: string) {
    return this.http.post<{ isAvailable: Boolean }>(`${environment.API_URL}/auth/is-available`, { email })
  }
}
