import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

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
  @Input() color: keyof typeof this.colorsList = 'primary';
  faSpinner = faSpinner;
   
  colorsList = {
    success: 'bg-success-700 hover:bg-success-800 focus:ring-success-300 text-white',
    danger: 'bg-red-700 hover:bg-red-800 focus:ring-red-300 text-white',
    'gray-light': 'bg-gray-200 hover:bg-gray-500 focus:ring-gray-50 text-gray-700',
    primary: 'bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 text-white',
    sky: 'bg-sky-700 hover:bg-sky-800 focus:ring-sky-300 text-white'
  };
  
  get colors() {
    return this.colorsList[this.color];
  }
}
