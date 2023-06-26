import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { IGeolocation } from 'src/app/modules/core/interfaces';
import { IUser } from 'src/app/modules/core/interfaces';
import { AuthService } from 'src/app/modules/core/services/auth.service';
import { MapComponent } from 'src/app/modules/shared/components/map/map.component';

@Component({
  selector: 'app-profile-update-form',
  templateUrl: './profile-update-form.component.html',
  styleUrls: ['./profile-update-form.component.scss']
})
export class ProfileUpdateFormComponent implements OnInit {
  hidePassword = true;
  @Input() user?: IUser;
  hashPassword!: string;
  ciUploaded = false;
  @ViewChild(MapComponent) map?: MapComponent;
  @Output() profileUpdate = new EventEmitter<{ password: string } & IUser>();
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<IUser>();

  profileUpdateForm = this.formBuilder.group(
    {
      name: [ '' ],
      surname : ['' ],
      isAdmin: [this.user?.isAdmin, [Validators.required]],
      password : ['', [
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern('^(?=.*[A-Z])(?=.*[0-9]).+$')
      ]],
      email : [this.user?.email,[ Validators.email]],
      phone : ['',[ Validators.maxLength(9),Validators.pattern('09[0-9]+')]],
      location: new FormControl<IGeolocation | undefined>(undefined),
    }
  );

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

  constructor(private formBuilder: FormBuilder,
    public authService: AuthService) { }

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

  handleSubmit() {
    if (!this.profileUpdateForm.valid) return;

    const value = this.profileUpdateForm.value;
    this.profileUpdate.emit({      
      password: value.password!,
      firstName: value.name!,
      lastName: value.surname!,
      email: value.email!,
      phoneNumbers: [
        value.phone!
      ],
      address: value.location!
    });

  }

  handleCancel() {
    this.cancel.emit();
  }
}
