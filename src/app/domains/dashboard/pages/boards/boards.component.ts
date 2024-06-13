import { Component } from '@angular/core';
import { NavbarComponent } from '@/shared/componets/navbar/navbar.component';

@Component({
  selector: 'app-boards',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './boards.component.html'
})
export class BoardsComponent {

}
