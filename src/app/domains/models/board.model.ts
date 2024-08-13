import { User } from "./user.model";

export interface Board {
    id: string,
    title: string,
    backgroundColor: "blue" | "sky" | "yellow" | "gray" | "violet" | "green",
    members: User[] 
}