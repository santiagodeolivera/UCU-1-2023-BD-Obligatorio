import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { SignupFormsComponent } from '../../components/signup-forms/signup-forms.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/modules/core/interfaces/user';
import { SignupService } from 'src/app/modules/core/services/signup.service';

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
    private signupService : SignupService) { }
  
  ngOnInit(): void {
    
  }
  /*
  pullFormData(){
    const data = this.formData.signUpForm.value;
    return data;
  }

  onSubmit(){
    const user = this.pullFormData();
    this.signupService.createUser(user.ci!, user.name!, user.surname!, user.urlPictureID!,
          user.hashPassword!, false, user.phone!,  user.geoDistance!, false, user.email!,
          user.city!, user.state!, user.address!).subscribe( (res) => {
      if (res.success) {
        this.router.navigate(['/login']);
        return;
      }
    });
  }*/
  pullFormData(){
    const user = this.formData.signUpForm.value;
    return user;
  }

  onSubmit(){
    const user = this.pullFormData() as User;
    this.signupService.createUser(user).subscribe( (res) => {
      if (res.success) {
        this.router.navigate(['/login']);
        return;
      }
    });
  }



}