import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/modules/core/interfaces/user';
import { ILogin } from 'src/app/modules/core/interfaces/ILogin';

@Component({
  selector: 'app-signup-forms',
  templateUrl: './signup-forms.component.html',
  styleUrls: ['./signup-forms.component.scss']
})
export class SignupFormsComponent implements OnInit, ILogin {
  hidePassword = true;
  ci!: string;
  hashPassword!: string;
  @Input() user?: User;

  constructor(private formBuilder: FormBuilder) { }
  
  ngOnInit(): void {
  }

  signUpForm = this.formBuilder.group(
    {
      //cada campo se completa con los datos del usuario de la variable user como el nombre user.name
      ci: ['',[Validators.required, Validators.minLength(6), Validators.maxLength(8), Validators.pattern('[0-9]+')]],
      name: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      surname : ['',[Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      urlPictureID : ['',[Validators.required, Validators.pattern('https?://.+')]],
      isAdmin: ['', [Validators.required]],
      hashPassword : ['',[Validators.required,
                      Validators.minLength(8),
                      Validators.maxLength(20),]],
      email : ['',[Validators.required, Validators.email]],
      phone : ['',[Validators.required, Validators.maxLength(9), Validators.pattern('[0-9]+')]],
      geoDistance : ['',[Validators.required, Validators.pattern('[0-9]+')]],
      geoState : ['',[Validators.required]],
      city : ['',[Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      state : ['',[Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      address : ['',[Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
      
    }
  );
  // list with the viewValue of state of Uruguay
  states = [ 
    {value: 'Artigas', viewValue: 'Artigas'},
    {value: 'Canelones', viewValue: 'Canelones'},
    {value: 'Cerro Largo', viewValue: 'Cerro Largo'},
    {value: 'Colonia', viewValue: 'Colonia'},
    {value: 'Durazno', viewValue: 'Durazno'},
    {value: 'Flores', viewValue: 'Flores'},
    {value: 'Florida', viewValue: 'Florida'},
    {value: 'Lavalleja', viewValue: 'Lavalleja'},
    {value: 'Maldonado', viewValue: 'Maldonado'},
    {value: 'Montevideo', viewValue: 'Montevideo'},
    {value: 'Paysandú', viewValue: 'Paysandú'}]
    

  
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