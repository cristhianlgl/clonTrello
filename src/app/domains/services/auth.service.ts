import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { switchMap, tap } from 'rxjs';
import { TokenService } from './token.service';
import { Token } from '@/models/token.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) { }

  login(email: string, password: string) {
    return this.http
      .post<Token>(`${environment.API_URL}/auth/login`, { email, password })
      .pipe(
        tap((response) => this.tokenService.save(response.access_token))
      )
  }

  logout(){
    console.log(' --- -- --logout')
    this.tokenService.remove();
    this.router.navigate(['/login']);
  }

  register(name: string, email: string, password: string) {
    return this.http.post(`${environment.API_URL}/auth/register`, { name, email, password })
  }

  registerAndLogin(name: string, email: string, password: string){
    return this.register(name, email, password).pipe(
      switchMap(() => this.login(email, password))
    )
  }

  recovery(email: string) {
    return this.http.post(`${environment.API_URL}/auth/recovery`, { email })
  }

  changePassword(token: string, newPassword: string) {
    return this.http.post(`${environment.API_URL}/auth/change-password`, { token, newPassword })
  }

  isAvailable(email: string) {
    return this.http.post<{ isAvailable: Boolean }>(`${environment.API_URL}/auth/is-available`, { email })
  }
}
