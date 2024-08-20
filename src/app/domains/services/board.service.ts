import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Board } from '@/models/board.model';
import { checkToken } from '@/interceptors/token.interceptor';
import { Card } from '@/models/card.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private bufferSpace = 65535;

  constructor(private http: HttpClient) { }

  getById(id: Board['id']) {
    return this.http.get<Board>(`${environment.API_URL}/boards/${id}`, { context: checkToken() })
  }

  create(title: string , backgroundColor: string) {
    return this.http
      .post<Board>(`${environment.API_URL}/boards`, { title, backgroundColor}, {context: checkToken()});
  }

  getPosition(cards: Card[], currentIndex: number) {
    if (cards.length <= 1)
      return this.bufferSpace;

    if (currentIndex === 0) {
      const onTopPosition = cards[1].position
      return onTopPosition / 2;
    }

    if (currentIndex === cards.length - 1) {
      const onBottomPosition = cards[currentIndex - 1].position
      return (onBottomPosition) + this.bufferSpace;
    }

    const onPreviousPosition = cards[currentIndex - 1].position;
    const onNextPosition = cards[currentIndex + 1].position;
    return (onPreviousPosition + onNextPosition) / 2;
  }

  getNewCardPosicion(cards: Card[]){
    if(cards.length <= 0)
      return this.bufferSpace;
    return cards[cards.length - 1].position + this.bufferSpace;
  }
}
