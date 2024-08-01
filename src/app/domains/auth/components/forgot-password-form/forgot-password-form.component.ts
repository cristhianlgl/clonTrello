import { BtnComponent } from '@/shared/componets/btn/btn.component';
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@/services/auth.service';
import { RequestStatus } from '@/models/request-status.model';

@Component({
  selector: 'app-forgot-password-form',
  standalone: true,
  imports: [BtnComponent, NgIf, ReactiveFormsModule],
  templateUrl: './forgot-password-form.component.html'
})
export class ForgotPasswordFormComponent {

  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
  });
  status: RequestStatus = 'init';
  emailSent = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) { }

  sendLink() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    } 
    this.status = 'loading';
    const { email } = this.form.getRawValue();
    this.authService.recovery(email).subscribe({
      next:() => {
        this.status ='success';
        this.emailSent = true;
      },
      error:() => this.status = 'failed' 
    })

  }

}
