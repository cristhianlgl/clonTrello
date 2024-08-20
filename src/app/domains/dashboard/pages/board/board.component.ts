import { Component, inject, signal } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { CdkDragDrop, CdkDrag, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem, } from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Dialog } from '@angular/cdk/dialog';
import { TodoDialogComponent } from '@/dashboard/components/todo-dialog/todo-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from '@/services/board.service';
import { Board } from '@/models/board.model';
import { Card } from '@/models/card.model';
import { CardService } from '@/services/card.service';
import { COLORS_ONLY_BG } from '@/models/colors.model';
import { List } from '@/models/list.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { BtnComponent } from "../../../shared/components/btn/btn.component";

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
    NgFor,
    FontAwesomeModule,
    NgClass,
    ReactiveFormsModule,
    BtnComponent
],
  styleUrls: ['./board.component.css'],
  templateUrl: './board.component.html'
})
export class BoardComponent {

  private boardService = inject(BoardService);
  private cardService = inject(CardService);
  private bufferSpace = 65535;

  inputTitleCardForm = new FormControl<string>('', {
    nonNullable: false,
    validators: [Validators.required]
  })

  board = signal<Board | null>(null);
  faPlus = faPlus;

  constructor(
    public dialog: Dialog,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(param => {
      const id = param.get('id');
      if (id) {
        this.getBoard(id);
      }
    })
  }

  getBoard(id: string) {
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
    const position = this.getPosition(event.container.data, event.currentIndex)
    const listId = event.container.id;
    const card = event.container.data[event.currentIndex];
    this.updatePosition(card, position, listId)
  }

  getPosition(cards: Card[], currentIndex: number) {
    if (cards.length <= 1)
      return this.bufferSpace;

    if (currentIndex === 0) {
      const onTopPosition = cards[1].position
      return onTopPosition / 2;
    }

    if (currentIndex === cards.length - 1) {
      const onBottomPosition = cards[currentIndex - 1].position
      return (onBottomPosition) + this.bufferSpace;
    }

    const onPreviousPosition = cards[currentIndex - 1].position;
    const onNextPosition = cards[currentIndex + 1].position;
    return (onPreviousPosition + onNextPosition) / 2;
  }

  dropHorizontal(event: CdkDragDrop<any>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  addPanel(title: string) {
    //this.board.update(item => item?.lists.push({title: title, cards: []}))
  }

  updatePosition(card: Card, position: number, listId: string) {
    card.position = position;
    this.cardService.update(card.id, { position, listId })
      .subscribe()
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

  colorsList = COLORS_ONLY_BG;

  getColor() {
    const color = this.board()?.backgroundColor;
    return color
      ? this.colorsList[color]
      : this.colorsList["blue"];
  }

  openCardForm(list: List) {
    const board = this.board()
    if (board?.lists) {
      board.lists = board.lists.map(listI => ({ ...listI, showCardForm: listI.id === list.id, }));
    }
  }

  createList(list: List){
    const title = this.inputTitleCardForm.value;
    console.log(title)
    //list.cards.push()
  }

  closeCardForm(list: List){
    this.inputTitleCardForm.setValue('');
    list.showCardForm = false;
  }

}
