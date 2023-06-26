import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { IGeolocation, ILogin, IUser } from 'src/app/modules/core/interfaces';
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
  ciUploaded = false;

  @ViewChild(MapComponent) map?: MapComponent;

  @Output() signup = new EventEmitter<{ password: string } & IUser>();
  @Output() cancel = new EventEmitter<void>();

  signUpForm = this.formBuilder.group(
    {
      // La cedula debe tener entre 6 y 8 digitos, y no puede comenzar ser mayor a 100000 y menor a 80000000
      ci: new FormControl<number | undefined>(undefined, [Validators.required, Validators.min(100000), Validators.max(80000000)]),
      name: [ '', [ Validators.required ] ],
      surname : ['',[ Validators.required ] ],
      // La contraseña debe iniciar con mayuscula y tener al menos un numero
      password : ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern('^(?=.*[A-Z])(?=.*[0-9]).+$')
      ]],
      email : [ '', [ Validators.required, Validators.email] ],
      // el telefono debe iniciar con 09 y tener 9 digitos
      phone : ['', [ Validators.required, Validators.maxLength(9), Validators.pattern('09[0-9]+') ] ],
      location: new FormControl<IGeolocation | undefined>(undefined, Validators.required),
    }
  );

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

  handleSubmit() {
    if (!this.signUpForm.valid) return;
    const value = this.signUpForm.value;

    this.signup.emit({
      password: value.password!,
      firstName: value.name!,
      lastName: value.surname!,
      email: value.email!,
      address: value.location!,
      id: `${value.ci!}`,
      isAdmin: false,
      phoneNumbers: [
        value.phone!
      ],
      geoConfiguration: {
        active: false,
        maxDistance: 0
      }
    });
  }

  handleCancel() {
    this.cancel.emit();
  }

}
