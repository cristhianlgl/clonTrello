import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn',
  standalone: true,
  imports: [NgClass],
  templateUrl: './btn.component.html',
})
export class BtnComponent {

  @Input() typeBtn: 'button' | 'reset' | 'submit' = 'button';
  @Input() color: 'primary' | 'danger' | 'success' | 'sky' | 'gray-light'   = 'primary';
  
  get colors() {
    const colorsList: { [key: string]: string } = {
      success: 'bg-success-700 hover:bg-success-800 focus:ring-success-300 text-white',
      danger: 'bg-red-700 hover:bg-red-800 focus:ring-red-300 text-white',
      'gray-light': 'bg-gray-200 hover:bg-gray-500 focus:ring-gray-50 text-gray-700',
      primary: 'bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 text-white',
      sky: 'bg-sky-700 hover:bg-sky-800 focus:ring-sky-300 text-white'
    };
    return colorsList[this.color];
  }
}
