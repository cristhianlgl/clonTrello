import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { colors, COLORS } from '@/models/colors.model';

@Component({
  selector: 'app-card-color',
  standalone: true,
  imports: [NgClass],
  templateUrl: './card-color.component.html'
})
export class CardColorComponent {

  @Input() color: colors = 'blue';

  colorsList = COLORS;

  getColor() {
    return this.colorsList[this.color];
  }
}
