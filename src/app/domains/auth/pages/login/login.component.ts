import { Component} from '@angular/core';
import { FooterComponent } from '@/auth/components/footer/footer.component';
import { LoginFormComponent } from '@/auth/components/login-form/login-form.component';
import { BackgroundComponent } from '@/auth/components/background/background.component';
import { HeaderComponent } from '@/auth/components/header/header.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent, FooterComponent, BackgroundComponent, HeaderComponent],
  templateUrl: './login.component.html',
})


export class LoginComponent {

}
