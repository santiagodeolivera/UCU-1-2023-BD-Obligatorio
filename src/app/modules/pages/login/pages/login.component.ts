import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginFormsComponent } from '../component/login-forms/login-forms.component';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/modules/core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  @ViewChild('loginForm')
  formData!: LoginFormsComponent;

  constructor(private fb: FormBuilder,
    private router : Router,
    private loginService : LoginService,){  }

  ngOnInit(): void {
  }

  pullFormData(){
    const data = this.formData.loginForm.value;
    return data;
  }

  onSubmit(){
    const user = this.pullFormData();
    this.loginService.login(user.ci!, user.hashPassword!).subscribe( (res) => {
      if (res.success) {
        this.router.navigate(['/home']);
        return;
      }
    });
  }

}