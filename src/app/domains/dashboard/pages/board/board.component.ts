import { Component, Inject } from '@angular/core';
import { NavbarComponent } from '@/shared/componets/navbar/navbar.component';
import { NgFor } from '@angular/common';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Dialog } from '@angular/cdk/dialog';
import { TodoDialogComponent } from '@/dashboard/components/todo-dialog/todo-dialog.component';
import { TaskModel } from '@/models/task.model';
import { PanelModel } from '@/models/panel.model';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    NavbarComponent,
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
    NgFor,
    FontAwesomeModule
  ],
  styleUrls: ['./board.component.css'],
  templateUrl: './board.component.html'
})
export class BoardComponent {

  constructor(public dialog: Dialog) {

  }

  faPlus = faPlus;
  panels: PanelModel[] = [
    {
      title: 'To do', tasks: [
        { id: '1', title: 'Get to work' },
        { id: '2', title: 'Pick up groceries' },
        { id: '3', title: 'Fall asleep' }]
    },
    {
      title: 'Doing', tasks: [
        { id: '1', title: 'Go home' },
        { id: '2', title: 'Check e-mail' },
        { id: '3', title: 'Walk dog' }]
    },
    { title: 'Pending', tasks: [] },
    {
      title: 'Done', tasks: [
        { id: '1', title: 'Get up' },
        { id: '2', title: 'Brush teeth' },
        { id: '3', title: 'Take a shower' }]
    },
  ];

  drop(event: CdkDragDrop<TaskModel[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  dropHorizontal(event: CdkDragDrop<any>) {
    console.log(event)
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  addPanel(title: string) {
    this.panels.push({ title: title, tasks: [] })
  }

  openDialog(task: TaskModel, titlePanel: string): void {
    const dialogRef = this.dialog.open<string>(TodoDialogComponent, {
      minWidth: '500px',
      maxWidth: '50%',
      autoFocus: 'false',
      data: { task, titlePanel },
    });

    dialogRef.closed.subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

}
