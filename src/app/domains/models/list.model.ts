import { Card } from "./card.model";

export interface List{
    id: string,
    title: string,
    position: number,
    creationAt: string,
    updatedAt: string,
    cards:Card[],
    showCardForm?: boolean 
}

export interface CreateListDTO {
    title: string,
    position: number,
    boardId: string
}