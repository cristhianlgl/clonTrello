import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Board } from '@/models/board.model';
import { checkToken } from '@/interceptors/token.interceptor';
import { Card } from '@/models/card.model';
import { List } from '@/models/list.model';
import { colors } from '@/models/colors.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private bufferSpace = 65535;
  navbarBackground = signal<colors>('sky');

  constructor(private http: HttpClient) { }

  getById(id: Board['id']) {
    return this.http.get<Board>(`${environment.API_URL}/boards/${id}`, { context: checkToken() })
  }

  create(title: string , backgroundColor: string) {
    return this.http
      .post<Board>(`${environment.API_URL}/boards`, { title, backgroundColor}, {context: checkToken()});
  }

  getPosition(elements: Card[] | List[], currentIndex: number) {
    if (elements.length <= 1)
      return this.bufferSpace;

    if (currentIndex === 0) {
      const onTopPosition = elements[1].position
      return onTopPosition / 2;
    }

    if (currentIndex === elements.length - 1) {
      const onBottomPosition = elements[currentIndex - 1].position
      return (onBottomPosition) + this.bufferSpace;
    }

    const onPreviousPosition = elements[currentIndex - 1].position;
    const onNextPosition = elements[currentIndex + 1].position;
    return (onPreviousPosition + onNextPosition) / 2;
  }

  getNewCardPosicion(elements: Card[] | List[]){
    if(elements.length <= 0)
      return this.bufferSpace;
    return elements[elements.length - 1].position + this.bufferSpace;
  }

  setNavbarBackground(color: colors){
    this.navbarBackground.update( navBarColor => navBarColor = color)
  }
}
