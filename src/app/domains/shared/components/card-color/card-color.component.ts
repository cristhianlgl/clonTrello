import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-card-color',
  standalone: true,
  imports: [NgClass],
  templateUrl: './card-color.component.html'
})
export class CardColorComponent {

  @Input() color: keyof typeof this.colorsList = 'blue';

  colorsList = {
    blue: 'bg-blue-700 hover:bg-blue-800 text-white',
    sky: 'bg-sky-700 hover:bg-sky-800 text-white',
    yellow: 'bg-yellow-700 hover:bg-yellow-800 text-white',
    gray: 'bg-gray-700 hover:bg-gray-800 text-white',
    violet: 'bg-violet-700 hover:bg-violet-800 text-white',
    green: 'bg-green-700 hover:bg-green-800 text-white',
  };

  getColor() {
    return this.colorsList[this.color];
  }
}
