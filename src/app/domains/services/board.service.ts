import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Board } from '@/models/board.model';
import { checkToken } from '@/interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private http: HttpClient) { }

  getById(id: Board['id']) {
    return this.http.get<Board>(`${environment.API_URL}/boards/${id}`, { context: checkToken() })
  }
}
