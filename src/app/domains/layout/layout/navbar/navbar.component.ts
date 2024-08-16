import { Component, inject } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faInfoCircle, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { BtnComponent } from '@/shared/components/btn/btn.component';
import { AuthService } from '@/services/auth.service';
import { RouterLink } from '@angular/router';
import { BoardFormComponent } from '@/layout/components/board-form/board-form.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [BtnComponent, OverlayModule, FontAwesomeModule, RouterLink, BoardFormComponent],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  authService = inject(AuthService)
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faAngleDown = faAngleDown;
  user = this.authService.user;
  isOpen = false;
  isOpenCreate =  false;
  
  doLogout() {
    this.authService.logout();
  }
}
