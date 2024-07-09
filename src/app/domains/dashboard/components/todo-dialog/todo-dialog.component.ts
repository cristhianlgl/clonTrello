import { Component, Inject } from '@angular/core';
import {DialogRef, DIALOG_DATA, DialogModule} from '@angular/cdk/dialog';
import { BtnComponent } from '@/shared/componets/btn/btn.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClose, faCheckToSlot, faBars, faClock, faCheckSquare, faTag, faUser } from '@fortawesome/free-solid-svg-icons';
import { TaskModel } from '@/models/task.model';


@Component({
  selector: 'app-todo-dialog',
  standalone: true,
  imports: [DialogModule, BtnComponent, FontAwesomeModule],
  templateUrl: './todo-dialog.component.html'
})
export class TodoDialogComponent {

   faClose = faClose;
   faCheckToSlot = faCheckToSlot;
   faBars = faBars;
   faClock = faClock;
   faCheckSquare = faCheckSquare;
   faTag = faTag;
   faUser = faUser;
  
  constructor(  
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public data: {task:TaskModel, titlePanel: string}, ) {}

  close(){
    this.dialogRef.close();
  }
}
