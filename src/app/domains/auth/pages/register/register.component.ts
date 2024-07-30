import { BackgroundComponent } from '@/auth/components/background/background.component';
import { FooterComponent } from '@/auth/components/footer/footer.component';
import { HeaderComponent } from '@/auth/components/header/header.component';
import { RegisterFormComponent } from '@/auth/components/register-form/register-form.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HeaderComponent, BackgroundComponent, FooterComponent, RegisterFormComponent],
  templateUrl: './register.component.html'
})
export class RegisterComponent  {

}
