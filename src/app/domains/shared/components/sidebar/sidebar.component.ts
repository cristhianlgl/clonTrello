import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrello } from '@fortawesome/free-brands-svg-icons';
import { IconDefinition, faBox, faWaveSquare } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';

interface Link {
  icon: IconDefinition,
  title: string,
  url: string
}


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  links: Link[] = [
    { icon : faTrello, title: 'Boards', url: 'board' },
    { icon : faBox, title: 'Templates', url: 'template' },
    { icon : faWaveSquare, title: 'Home', url: 'home' },
  ]
}
