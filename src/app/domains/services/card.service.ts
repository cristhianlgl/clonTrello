import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Card, CardDto } from '@/models/card.model';
import { checkToken } from '@/interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private http = inject(HttpClient)

  update(id: Card['id'], changes: CardDto) {
    return this.http.put<Card>(`${environment.API_URL}/cards/${id}`,
      changes, { context: checkToken() })
  }
}
