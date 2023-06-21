import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
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

  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<User>();
  
  constructor(private fb : FormBuilder,
    private router: Router,
    private signupService : SignupService,
    private dialog: MatDialog) { }
  
  ngOnInit(): void {
    
  }
  
  pullFormData(){
    const user = this.formData.signUpForm.value as User;
    return user;
  }

  onSubmit(){
    const user = this.pullFormData();
    this.signupService.createUser(user).subscribe( (res) => {
      if (res.success) {
        this.router.navigate(['/login']);
        return;
      }
    });
  }
  handleSubmit() {
    if (!this.formData.signUpForm.valid) return;

    const value = this.formData.signUpForm.value;
    const user: User = {
      ci: value.ci || undefined,
      name: value.name || undefined,
      surname: value.surname || undefined,
      urlPictureID: value.urlPictureID || undefined,
      isAdmin: false,
      hashPassword: value.hashPassword || undefined,
      email: value.email || undefined,
      phone: value.phone || undefined,
      geoDistance: value.geoDistance || undefined,
      geoState: value.geoState || undefined,
      location: value.location || undefined,
    };

    this.save.emit(user);
  }

  handleCancel() {
    this.cancel.emit();
  }
}
