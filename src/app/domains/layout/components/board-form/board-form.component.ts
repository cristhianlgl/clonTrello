import { colors, COLORS_ONLY_BG } from '@/models/colors.model';
import { BoardService } from '@/services/board.service';
import { BtnComponent } from '@/shared/components/btn/btn.component';
import { NgClass } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-board-form',
  standalone: true,
  imports: [ReactiveFormsModule, BtnComponent, FontAwesomeModule, NgClass],
  templateUrl: './board-form.component.html',
})
export class BoardFormComponent {
  private formBuilder = inject(FormBuilder);
  private boardService = inject(BoardService);
  private router = inject(Router);
  
  @Output() closeOverlay =  new EventEmitter<boolean>();

  faCheck = faCheck;
  form = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required]],
    backgroundColor: new FormControl<colors>('sky', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  optionsColors: colors[] = [
    'yellow',
    'blue',
    'green',
    'red',
    'gray',
    'violet',
    'sky',
    'gray-light',
  ];
  colors = COLORS_ONLY_BG;

  doSave() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const { title, backgroundColor } = this.form.getRawValue();
    console.log(title, backgroundColor);
    this.boardService
      .create(title, backgroundColor)
      .subscribe({
        next: (data) => {
          this.router.navigate(['app/boards',data.id]);
          this.closeOverlay.emit(false);
        }
      });
  }

  getColors(color: string) {
    return color ? this.colors[color] : this.colors['blue'];
  }
}
