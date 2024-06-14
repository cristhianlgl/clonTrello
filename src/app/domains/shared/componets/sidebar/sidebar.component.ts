import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrello } from '@fortawesome/free-brands-svg-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  links:string[] = ['Tablero','Pantilla','Inicio']
  faTrello = faTrello;
}
