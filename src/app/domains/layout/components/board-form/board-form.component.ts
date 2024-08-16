import { COLORS } from '@/models/colors.model';
import { BtnComponent } from '@/shared/components/btn/btn.component';
import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-board-form',
  standalone: true,
  imports: [ReactiveFormsModule, BtnComponent, FontAwesomeModule, NgClass],
  templateUrl: './board-form.component.html'
})
export class BoardFormComponent {
  private formBuilder = inject(FormBuilder);
  faCheck = faCheck;
  form = this.formBuilder.group({
    title: ['', [ Validators.required, Validators.minLength(6)]],
    backgroundColor: ['', [ Validators.required]],
  })

  optionsColors = [
    { value : 'yellow' },
    { value : 'blue' },
    { value : 'green' },
    { value : 'red' },
    { value : 'gray' },
    { value : 'violet' },
    { value : 'sky' },
    { value : 'pink' },
  ]

  colors = COLORS;

  doSave(){
    if(!this.form.valid){
      this.form.markAllAsTouched();
      return;
    }
    const {title, backgroundColor } = this.form.getRawValue();
    console.log(title, backgroundColor)
  }

  getColors(color:string){
    return color ? this.colors[color] : this.colors['blue']
  }

}
