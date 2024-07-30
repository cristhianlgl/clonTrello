import { BtnComponent } from '@/shared/componets/btn/btn.component';
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@/services/auth.service';
import { RequestStatus } from '@/models/request-status.model';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports:[FontAwesomeModule, BtnComponent, ReactiveFormsModule, NgIf],
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent {

  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [ Validators.required, Validators.minLength(6)]],
  });
  faPen = faPen;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  status: RequestStatus = 'init';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authServices: AuthService
  ) { }

  doLogin() {    
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }     
    this.status = 'loading';
    const { email, password } = this.form.getRawValue();
    this.authServices.login(email, password)
    .subscribe({
      next: () => {
        this.status = 'success';
        this.router.navigate(['/app']);
      },
      error: () => {
        this.status = 'failed'
      }
    })
  }
}
