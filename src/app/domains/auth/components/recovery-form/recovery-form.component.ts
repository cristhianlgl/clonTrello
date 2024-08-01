import { BtnComponent } from '@/shared/componets/btn/btn.component';
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestStatus } from '@/models/request-status.model';


import { CustomValidators } from '@/utils/validators';

@Component({
  selector: 'app-recovery-form',
  standalone: true,
  imports: [FontAwesomeModule, BtnComponent, ReactiveFormsModule, NgIf],
  templateUrl: './recovery-form.component.html',
})
export class RecoveryFormComponent {
  form = this.formBuilder.nonNullable.group(
    {
      newPassword: ['', [Validators.minLength(6), Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [
        CustomValidators.MatchValidator('newPassword', 'confirmPassword'),
      ],
    }
  );
  status: RequestStatus = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  token:string = '';
  messages:string[] = []

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    route.queryParamMap.subscribe(param => {
      const token = param.get('token')
      if (token) {
        this.token = token;
      }
      else {
        router.navigate(['/login'])
      }
    })
  }

  recovery() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.status = 'loading'
    const { newPassword } = this.form.getRawValue();
    this.authService.changePassword(this.token, newPassword)
    .subscribe({
      next: () => {
        this.status = 'success'
        this.router.navigate(['/login'])
      },
      error: (error) => {
        console.log(error)
        this.status = 'failed'; 
        if(error.error.statusCode === 401)
          this.messages.push("Unauthorized")
        else
          this.messages = error.error.message;
      }
    })


  }
}
