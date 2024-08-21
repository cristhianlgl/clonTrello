import { Component, inject, signal } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { CdkDragDrop, CdkDrag, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem, } from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Dialog } from '@angular/cdk/dialog';
import { TodoDialogComponent } from '@/dashboard/components/todo-dialog/todo-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardService } from '@/services/board.service';
import { Board } from '@/models/board.model';
import { Card } from '@/models/card.model';
import { CardService } from '@/services/card.service';
import { COLORS_ONLY_BG } from '@/models/colors.model';
import { List } from '@/models/list.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { BtnComponent } from "../../../shared/components/btn/btn.component";
import { ListService } from '@/services/list.service';

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
  private listService = inject(ListService);

  inputTitleCardForm = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required]
  })

  inputTitleListForm = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required]
  })

  board = signal<Board | null>(null);
  faPlus = faPlus;
  showAddList: boolean = false
  colorsList = COLORS_ONLY_BG;

  constructor(
    public dialog: Dialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
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
    this.boardService.getById(id).subscribe({ 
        next: data => {
          this.board.set(data);
        },
        error: () =>  this.router.navigate(['/app/boards'])
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
    const position = this.boardService.getPosition(event.container.data, event.currentIndex)
    const listId = event.container.id;
    const card = event.container.data[event.currentIndex];
    this.updatePosition(card, position, listId)
  }

  dropHorizontal(event: CdkDragDrop<any>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  addList() {
    const title = this.inputTitleListForm.value;
    const board = this.board();
    if (board) {
      this.listService
        .create({ title: title, position: this.boardService.getNewCardPosicion(board.lists), boardId: board.id })
        .subscribe({
          next: data => {
            board.lists.push({ ...data, cards: [] });
            this.inputTitleListForm.setValue('');
            this.showAddList = false;
          },
          error: error => console.error(error)
        })
    }
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


  getColor() {
    const color = this.board()?.backgroundColor;
    return color
      ? this.colorsList[color]
      : this.colorsList["light"];
  }

  openCardForm(list: List) {
    const board = this.board()
    if (board?.lists) {
      board.lists = board.lists.map(listI => ({ ...listI, showCardForm: listI.id === list.id, }));
    }
  }

  addCard(list: List) {
    const title = this.inputTitleCardForm.value;
    const board = this.board();
    if (board) {
      this.cardService
        .create({
          title: title,
          listId: list.id,
          boardId: board.id,
          position: this.boardService.getNewCardPosicion(list.cards)
        })
        .subscribe({
          next: data => {
            list.cards.push(data);
            this.inputTitleCardForm.setValue('');
          },
          error: error => console.log(error)
        });
    }
  }

  closeCardForm(list: List) {
    this.inputTitleCardForm.setValue('');
    list.showCardForm = false;
  }

  closeListForm() {
    this.inputTitleCardForm.setValue('');
    this.showAddList = false;
  }

}
