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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

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

  faPlus = faPlus;
  panels = [
    { title: 'To do', data: ['Get to work', 'Pick up groceries', 'Fall asleep'] },
    { title: 'Doing', data: ['Go home', 'Check e-mail', 'Walk dog'] },
    { title: 'Pending', data: [] },
    { title: 'Done', data: ['Get up', 'Brush teeth', 'Take a shower'] },

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

  dropHorizontal(event: CdkDragDrop<any>) {
    console.log(event)
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  addPanel(title:string){
    this.panels.push({ title: title, data:[]})
  }

}
