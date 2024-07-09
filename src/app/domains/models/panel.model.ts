import { TaskModel } from "./task.model"

export interface PanelModel {
    title: string
    tasks: TaskModel[]
}