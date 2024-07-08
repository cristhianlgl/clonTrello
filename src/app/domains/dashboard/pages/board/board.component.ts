import { Component } from '@angular/core';
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

export interface ToDo {
  id: string;
  title: string;
}

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    NavbarComponent,
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
    NgFor
  ],
  styleUrls: ['./board.component.css'],
  templateUrl: './board.component.html'
})
export class BoardComponent {

  panels = [
    { id: 'panel-1', title: 'To do', data: ['Get to work', 'Pick up groceries', 'Fall asleep'] },
    { id: 'panel-2', title: 'Doing', data: ['Go home', 'Check e-mail', 'Walk dog'] },
    { id: 'panel-3', title: 'Done', data: ['Get up', 'Brush teeth', 'Take a shower'] }
  ];

  drop(event: CdkDragDrop<any>) {
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
}
