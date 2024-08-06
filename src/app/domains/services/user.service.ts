import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@/models/user.model';
import { TokenService } from './token.service';
import { environment } from '../../../environments/environment';
import { checkToken } from '@/interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private token = inject(TokenService).get();
  private httpClient = inject(HttpClient);

  getAll() {
    return this.httpClient
      .get<User[]>(`${environment.API_URL}/users`, {context: checkToken()})
  }
}
