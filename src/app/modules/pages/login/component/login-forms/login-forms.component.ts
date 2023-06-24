import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { IAuthRequest } from 'src/app/modules/core/interfaces';

@Component({
  selector: 'app-login-forms',
  templateUrl: './login-forms.component.html',
  styleUrls: ['./login-forms.component.scss']
})
export class LoginFormsComponent implements OnInit {
  hidePassword = true;

  loginForm = this.formBuilder.group({
    ci: new FormControl<number | undefined>(undefined, [
      Validators.required,
      Validators.min(100000),
      Validators.max(80000000)
    ]),
    password : ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern('^(?=.*[A-Z])(?=.*[0-9]).+$')
    ]],
  });

  @Output() login = new EventEmitter<IAuthRequest>();

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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  handleLogin() {
    if (!this.loginForm.valid) return;

    this.login.emit({
      ci: `${this.loginForm.value.ci}`,
      password: this.loginForm.value.password!
    });
  }
}
