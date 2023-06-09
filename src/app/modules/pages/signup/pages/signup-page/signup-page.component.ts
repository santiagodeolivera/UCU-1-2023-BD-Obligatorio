import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { SignupFormsComponent } from '../../components/signup-forms/signup-forms.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/modules/core/interfaces/user';
//import { SignupService } from 'src/app/modules/core/services/signup.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent implements OnInit {
  
  @ViewChild('signUpForm')
  formData!: SignupFormsComponent;

  constructor(private fb : FormBuilder,
    private router: Router,
    //private signupService : SignupService,
    private dialog: MatDialog) { }
  
  ngOnInit(): void {
  }

  pullFormData(){
    const user = this.formData.signUpForm.value as User;
    return user;
  }
  

}
