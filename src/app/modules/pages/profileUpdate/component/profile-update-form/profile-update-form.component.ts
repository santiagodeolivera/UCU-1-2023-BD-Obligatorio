import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/modules/core/interfaces/user';

@Component({
  selector: 'app-profile-update-form',
  templateUrl: './profile-update-form.component.html',
  styleUrls: ['./profile-update-form.component.scss']
})
export class ProfileUpdateFormComponent implements OnInit {
  hidePassword = true;
  @Input() user?: User;

  profileUpdateForm = this.formBuilder.group(
    {
      //cada campo se completa con los datos del usuario de la variable user como el nombre user.name
      name: [this.user?.name,[Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      surname : [this.user?.surname,[Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      urlPictureID : [this.user?.urlPictureID,[Validators.required, Validators.pattern('https?://.+')]],
      isAdmin: [this.user?.isAdmin, [Validators.required]],
      hashPassword : [this.user?.password,[Validators.required,
                      Validators.minLength(6),
                      Validators.maxLength(16),]],
      email : [this.user?.email,[Validators.required, Validators.email]],
      phone : [this.user?.phone,[Validators.required, Validators.maxLength(10), Validators.pattern('[0-9]+')]],
      geoDistance : [this.user?.geoDistance,[Validators.required, Validators.maxLength(3), Validators.pattern('[0-9]+')]],
      geoState : [this.user?.geoState,[Validators.required]],
      city : [this.user?.city,[Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      state : [this.user?.state,[Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      address : [this.user?.address ,[Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
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
  
  adminOption = [
    {value: 'true', viewValue: 'Yes'},
    {value: 'false', viewValue: 'No'}
  ]
  
  get passwordIconName(): string {
    return this.hidePassword ? 'visibility_off' : 'visibility';
  }

  get passwordIconColor(): string {
    return this.hidePassword ? '' : 'primary';
  }

  get passwordInputType(): string {
    return this.hidePassword ? 'password' : 'text';
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

}
