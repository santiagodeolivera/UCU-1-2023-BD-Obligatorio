import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { IGeolocation, ILogin } from 'src/app/modules/core/interfaces';
import { User } from 'src/app/modules/core/interfaces/user';
import { MapComponent } from 'src/app/modules/shared/components/map/map.component';

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
  @ViewChild(MapComponent) map?: MapComponent;

  signUpForm = this.formBuilder.group(
    {
      // La cedula debe tener entre 6 y 8 digitos, y no puede comenzar ser mayor a 100000 y menor a 80000000
      ci: ['',[Validators.required, Validators.minLength(6), Validators.maxLength(8), Validators.pattern('[0-9]+'), 
            Validators.min(100000), Validators.max(80000000)]],
      name: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]+')]],
      surname : ['',[Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]+')]],
      urlPictureID : ['',[Validators.required, Validators.pattern('https?://.+')]],
      isAdmin: ['', [Validators.required]],
      // La contraseña debe iniciar con mayuscula y tener al menos un numero
      hashPassword : ['',[Validators.required,
                      Validators.minLength(8),
                      Validators.maxLength(20),
                      //Validators.pattern('^[A-Z].*?[0-9].*$')]],
                      Validators.pattern('^[A-Z](?=.*[0-9])[a-zA-Z0-9]+$')]],
      email : ['',[Validators.required, Validators.email]],
      // el telefono debe iniciar con 09 y tener 9 digitos
      phone : ['',[Validators.required, Validators.maxLength(9), Validators.pattern('09[0-9]+')]],
      geoDistance : [this.user?.geoDistance,[Validators.required, Validators.maxLength(20), Validators.pattern('[0-9]+')]],
      geoState : [this.user?.geoState,[Validators.required]],
      location: new FormControl<IGeolocation | undefined>(undefined, Validators.required),
    }
  );
  // list with the viewValue of state of Uruguay
  /*states = [ 
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
    */
  
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

  handleMapClick($event: IGeolocation) {
    this.signUpForm.controls.location.setValue($event);
    this.map?.setFocusedPosition($event);
  }

  handleMapSearch($event: IGeolocation) {
    this.signUpForm.controls.location.setValue($event);
    this.map?.setFocusedPosition($event);
  }

}
