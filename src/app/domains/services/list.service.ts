import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateListDTO, List } from '@/models/list.model'; 
import { environment } from '../../../environments/environment';
import { checkToken } from '@/interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(
    private http: HttpClient
  ) { }

  create(list: CreateListDTO) {
    return this.http.post<List>(`${environment.API_URL}/lists`, list, { context : checkToken()});
  }
}
