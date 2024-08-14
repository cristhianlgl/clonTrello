import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { colors, COLORS } from '@/models/colors.model';

@Component({
  selector: 'app-btn',
  standalone: true,
  imports: [NgClass, FontAwesomeModule],
  templateUrl: './btn.component.html',
})
export class BtnComponent {

  @Input() disabled = false;
  @Input() loading = false;
  @Input() typeBtn: 'button' | 'reset' | 'submit' = 'button';
  @Input() color:colors = 'primary';
  faSpinner = faSpinner;
   
  colorsList = COLORS;
  
  get colors() {
    return this.colorsList[this.color];
  }
}
