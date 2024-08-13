import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@/models/user.model';
import { environment } from '../../../environments/environment';
import { checkToken } from '@/interceptors/token.interceptor';
import { Board } from '@/models/board.model';

@Injectable({
  providedIn: 'root'
})
export class MeService {

  constructor(
    private http: HttpClient
  ) { }

  get(){
    return this.http.get<User>(`${environment.API_URL}/me/profile`,{ context: checkToken() });
  }

  getMeBoards(){
    return this.http.get<Board[]>(`${environment.API_URL}/me/boards`,{ context: checkToken() });
  }
}
