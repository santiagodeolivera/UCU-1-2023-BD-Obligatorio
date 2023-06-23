import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthRequest, ILogin } from 'src/app/modules/core/interfaces';

@Component({
  selector: 'app-login-forms',
  templateUrl: './login-forms.component.html',
  styleUrls: ['./login-forms.component.scss']
})
export class LoginFormsComponent implements OnInit, AuthRequest{
  hidePassword = true;
  ci!: string;
  hashPassword!: string;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  loginForm = this.formBuilder.group({
    ci: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8), Validators.pattern('[0-9]+')
          ,Validators.min(100000), Validators.max(80000000)]],
    hashPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20),
      Validators.pattern('^[A-Z](?=.*[0-9])[a-zA-Z0-9]+$')]]
  });

  get passwordIconName(): string {
    return this.hidePassword ? 'visibility_off' : 'visibility';
  }

  get passwordIconColor(): string {
    return this.hidePassword ? '' : 'primary';
  }

  get passwordInputType(): string {
    return this.hidePassword ? 'password' : 'text';
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
