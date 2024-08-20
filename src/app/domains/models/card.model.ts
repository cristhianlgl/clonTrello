import { List } from "./list.model";

export interface Card {
    id: string,
    title: string,
    description?: string,
    position: number,
    creationAt: string,
    updatedAt: string,
    list: List
}

export interface CreateCardDto extends Partial<Omit<Card, 'id' | 'list'>> {
    listId?: number | string;
    boardId?: string;
}

export interface CardDto {
    title?: string,
    description?: string,
    position?: number,
    listId?: string,
    boardId?: string
}