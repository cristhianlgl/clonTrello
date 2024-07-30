import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { SidebarComponent } from '@/shared/componets/sidebar/sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock, faAngleUp, faAngleDown,faGear, faUsers, faBorderAll, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faTrello } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-boards',
  standalone: true,
  imports: [SidebarComponent, FontAwesomeModule, CdkAccordionModule, NgClass],
  templateUrl: './boards.component.html'
})

export class BoardsComponent {
  faClock = faClock;
  faAngleUp = faAngleUp
  faAngleDown = faAngleDown
  faGear = faGear
  faUsers = faUsers
  faBorderAll = faBorderAll
  faHeart = faHeart
  faTrello=  faTrello

  items= [
    {
      label: 'item 1',
      items : [{label : 'Sub Item 1.1'}, {label : 'Sub Item 1.2'}, {label : 'Sub Item 1.2'}]
    },
    {
      label: 'item 2',
      items : [{label : 'Sub Item 2.1'}]
    },
    {
      label: 'item 3',
      items : [{label : 'Sub Item 3.1'}, {label : 'Sub Item 3.2'}, {label : 'Sub Item 3.2'}]
    }
  ]
}
