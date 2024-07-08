import { Component, Inject } from '@angular/core';
import {Dialog,DialogRef, DIALOG_DATA, DialogModule} from '@angular/cdk/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-todo-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './todo-dialog.component.html'
})
export class TodoDialogComponent {
  constructor(  public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public data: DialogData, ) {}
}
