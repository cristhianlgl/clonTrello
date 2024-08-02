import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@/models/user.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private token = inject(TokenService).get();
  private httpClient = inject(HttpClient);

  getAll(){
    return this.httpClient.get<User[]>('/users',{headers: {Authentication: `Baerer ${this.token}`}})
  }
}
