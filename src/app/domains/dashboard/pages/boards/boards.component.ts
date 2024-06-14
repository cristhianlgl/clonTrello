import { Component } from '@angular/core';
import { NavbarComponent } from '@/shared/componets/navbar/navbar.component';
import { SidebarComponent } from '@/shared/componets/sidebar/sidebar.component';

@Component({
  selector: 'app-boards',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent],
  templateUrl: './boards.component.html'
})
export class BoardsComponent {

}
