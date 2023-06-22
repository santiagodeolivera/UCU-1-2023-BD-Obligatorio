import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { IGeolocation } from 'src/app/modules/core/interfaces';
import { User } from 'src/app/modules/core/interfaces/user';
import { MapComponent } from 'src/app/modules/shared/components/map/map.component';

@Component({
  selector: 'app-profile-update-form',
  templateUrl: './profile-update-form.component.html',
  styleUrls: ['./profile-update-form.component.scss']
})
export class ProfileUpdateFormComponent implements OnInit {
  hidePassword = true;
  @Input() user?: User;
  @ViewChild(MapComponent) map?: MapComponent;
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<User>();

  profileUpdateForm = this.formBuilder.group(
    {
      //cada campo se completa con los datos del usuario de la variable user como el nombre user.name
      name: [this.user?.name,[Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]],
      surname : [this.user?.surname,[Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]],
      urlPictureID : [this.user?.urlPictureID,[Validators.required, Validators.pattern('https?://.+')]],
      isAdmin: [this.user?.isAdmin, [Validators.required]],
      hashPassword : [this.user?.hashPassword,[Validators.required,
                      Validators.minLength(8),
                      Validators.maxLength(20),
                      Validators.pattern('^[A-Z](?=.*[0-9])[a-zA-Z0-9]+$')]],
      email : [this.user?.email,[Validators.required, Validators.email]],
      phone : [this.user?.phone,[Validators.required, Validators.maxLength(9),Validators.pattern('09[0-9]+')]],
      geoDistance : [this.user?.geoDistance,[Validators.required, Validators.maxLength(20), Validators.pattern('[0-9]+')]],
      geoState : [this.user?.geoState,[Validators.required]],
      location: new FormControl<IGeolocation | undefined>(undefined, Validators.required),
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
    {value: 'true', viewValue: 'Si'},
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

  handleMapClick($event: IGeolocation) {
    this.profileUpdateForm.controls.location.setValue($event);
    this.map?.setFocusedPosition($event);
  }

  handleMapSearch($event: IGeolocation) {
    this.profileUpdateForm.controls.location.setValue($event);
    this.map?.setFocusedPosition($event);
  }
/*
  handleSubmit() {
    if (!this.profileUpdateForm.valid) return;

    const value = this.profileUpdateForm.value;
    const user: User = {
      ci: this.user?.ci,
      name: value.name || undefined,
      surname: value.surname || undefined,
      urlPictureID: value.urlPictureID || undefined,
      isAdmin: value.isAdmin || undefined,
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
*/
}
