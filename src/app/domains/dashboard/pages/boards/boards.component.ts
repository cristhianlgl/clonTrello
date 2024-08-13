import { Component, inject, signal, WritableSignal } from '@angular/core';
import { NgClass } from '@angular/common';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { SidebarComponent } from '@/shared/componets/sidebar/sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock, faAngleUp, faAngleDown,faGear, faUsers, faBorderAll, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faTrello } from '@fortawesome/free-brands-svg-icons';
import { MeService } from '@/services/me.service';
import { Board } from '@/models/board.model';

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
  faTrello=  faTrello;
  meService = inject(MeService);
  boards:WritableSignal<Board[]> = signal([])
  
  ngOnInit(){
    this.getBoards();
  }

  getBoards(){
    this.meService.getMeBoards().subscribe((data)=>{
      this.boards.set(data);
    })
  }
}
