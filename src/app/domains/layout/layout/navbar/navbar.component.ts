import { Component, inject, signal } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { BtnComponent } from '@/shared/componets/btn/btn.component';
import { AuthService } from '@/services/auth.service';
import { User } from '@/models/user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [BtnComponent, OverlayModule, FontAwesomeModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  isOpen = false;
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  authService = inject(AuthService)
  user!:User|null 

  doLogout() {
    this.authService.logout();
  }

  ngOnInit(){
     this.authService.getProfile().subscribe({ 
      next:(data) => this.user = data
     })
  }
}
