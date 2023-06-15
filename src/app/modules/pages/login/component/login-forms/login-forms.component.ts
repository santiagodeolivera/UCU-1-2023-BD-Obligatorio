import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ILogin } from 'src/app/modules/core/interfaces/ILogin';

@Component({
  selector: 'app-login-forms',
  templateUrl: './login-forms.component.html',
  styleUrls: ['./login-forms.component.scss']
})
export class LoginFormsComponent implements OnInit, ILogin{
  hidePassword = true;
  ci!: string;
  hashPassword!: string;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  loginForm = this.formBuilder.group({
    ci: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8), Validators.pattern('[0-9]+')]],
    hashPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]]
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