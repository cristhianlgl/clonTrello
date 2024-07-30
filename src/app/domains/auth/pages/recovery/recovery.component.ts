import { BackgroundComponent } from '@/auth/components/background/background.component';
import { FooterComponent } from '@/auth/components/footer/footer.component';
import { HeaderComponent } from '@/auth/components/header/header.component';
import { RecoveryFormComponent } from '@/auth/components/recovery-form/recovery-form.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-recovery',
  standalone: true,
  imports: [HeaderComponent, BackgroundComponent, FooterComponent, RecoveryFormComponent],
  templateUrl: './recovery.component.html',
})
export class RecoveryComponent {

}
