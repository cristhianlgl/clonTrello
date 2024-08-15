import { Component, inject, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { CdkDragDrop, CdkDrag, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem, } from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Dialog } from '@angular/cdk/dialog';
import { TodoDialogComponent } from '@/dashboard/components/todo-dialog/todo-dialog.component';
import { TaskModel } from '@/models/task.model';
import { PanelModel } from '@/models/panel.model';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from '@/services/board.service';
import { Board } from '@/models/board.model';
import { Card } from '@/models/card.model';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
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

  private boardService =  inject(BoardService);
  board = signal<Board | null>(null);
  faPlus = faPlus;

  constructor (
      public dialog: Dialog,
      private activatedRoute: ActivatedRoute
    )
    {  }

  ngOnInit(){
      this.activatedRoute.paramMap.subscribe(param => {
        const id = param.get('id');
        if(id){
          this.getBoard(id);
        }
      })
  }

  getBoard(id: string){
    this.boardService.getById(id).subscribe(data => {
       this.board.set(data);
    })
  }

  drop(event: CdkDragDrop<Card[]>) {
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
    const result = this.getPosition(event.container.data, event.currentIndex)
    console.log(result)
  }

  getPosition(cards:Card[], index: number){
    if(cards.length <= 1)
      return "New"
    if(index === 0)
      return "Top"
    if( index === cards.length - 1)
      return "bottom"
    return "middlee"
  }

  dropHorizontal(event: CdkDragDrop<any>) {
    console.log(event)
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  addPanel(title: string) {
    //this.board.update(item => item?.lists.push({title: title, cards: []}))
  }

  openDialog(task: Card, titlePanel: string): void {
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
