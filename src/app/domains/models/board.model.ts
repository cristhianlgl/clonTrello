import { Card } from "./card.model";
import { colors } from "./colors.model";
import { List } from "./list.model";
import { User } from "./user.model";

export interface Board {
    id: string,
    title: string,
    backgroundColor: colors,
    members: User[],
    lists: List[],
    cards: Card[] 
}