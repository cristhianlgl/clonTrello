import { Component, inject } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faInfoCircle, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { BtnComponent } from '@/shared/components/btn/btn.component';
import { AuthService } from '@/services/auth.service';
import { RouterLink } from '@angular/router';
import { BoardFormComponent } from '@/layout/components/board-form/board-form.component';
import { BoardService } from '@/services/board.service';
import { COLORS_NAVBAR } from '@/models/colors.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [BtnComponent, OverlayModule, FontAwesomeModule, RouterLink, BoardFormComponent, NgClass],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  authService = inject(AuthService)
  boardService = inject(BoardService)
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faAngleDown = faAngleDown;
  user = this.authService.user;
  isOpen = false;
  isOpenCreate =  false;
  navbarBackgroundColor = this.boardService.navbarBackground;
  colors = COLORS_NAVBAR;
  
  doLogout() {
    this.authService.logout();
  }

  closeEmiter(event: boolean) {
    this.isOpenCreate = event;
  }

  getColor(){
    return this.colors[this.navbarBackgroundColor()];
  }

}
