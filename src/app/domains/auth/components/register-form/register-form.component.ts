import { BtnComponent } from '@/shared/componets/btn/btn.component';
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash, faL } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@/services/auth.service';

import { CustomValidators } from '@/utils/validators';
import { RequestStatus } from '@/models/request-status.model';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports:[FontAwesomeModule, BtnComponent, ReactiveFormsModule, NgIf],
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {
  formEmail = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
  });

  form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(6), Validators.required]],
    confirmPassword: ['', [Validators.required]],
  }, {
    validators: [ CustomValidators.MatchValidator('password', 'confirmPassword') ]
  });
  status: RequestStatus = 'init';
  statusEmail: RequestStatus = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  showRegister = false;
  message:string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  register() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.status = 'loading';
    const { name, email, password } = this.form.getRawValue();
    this.authService
      .registerAndLogin(name, email, password)
      .subscribe({
        next:() => {
            this.status = 'success';
            this.router.navigate(['/app/boards']);
        },
        error: (error) => {
          if(error.error.code === "SQLITE_CONSTRAINT_UNIQUE"){
            this.status = 'failed'
            this.message = 'This user already exists, please check your email.'
          }
        }
      })
  }

  validateEmail(){
    if (!this.formEmail.valid) {
      this.formEmail.markAllAsTouched();
      return;
    }
    this.statusEmail = 'loading';
    const { email } = this.formEmail.getRawValue();
    this.authService
    .isAvailable(email)
    .subscribe({
      next:(data) => {
          if(data.isAvailable){
            this.showRegister = true;
            this.form.controls.email.setValue(email);
            return;
          }
          this.router.navigate(['/login'], { queryParams: {email}});
      },
      error: (error) => {}
    });
  }
}
