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

  profileUpdateForm = this.formBuilder.group({
    name: [ this.runningUser.firstName ],
    surname : [this.runningUser.lastName ],
    password : ['', [
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern('^(?=.*[A-Z])(?=.*[0-9]).+$')
    ]],
    email : [this.runningUser.email,[ Validators.email]],
    phone : [this.phoneNumber , [ Validators.maxLength(9),Validators.pattern('^(9|09)[0-9]+') ]],
    location: new FormControl<IGeolocation | undefined>(this.runningUser.address),
  });

  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<IUser>();

  @ViewChild(MapComponent) map?: MapComponent;

  get runningUser(): IUser {
    return this.authService.runningUser!;
  }

  get phoneNumber(): string {
    if (!this.runningUser.phoneNumbers?.length) return '';

    return this.runningUser.phoneNumbers[0];
  }

  constructor(private formBuilder: FormBuilder,
    public authService: AuthService) { }

  ngOnInit(): void {
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

    this.save.emit({
      id: this.runningUser.id,
      firstName: value.name || undefined,
      lastName: value.surname || undefined,
      email: value.email || undefined,
      phoneNumbers: value.phone ? [
        value.phone
      ] : undefined,
      address: value.location || undefined,
      geoConfiguration: this.runningUser.geoConfiguration
    });

  }

  handleCancel() {
    this.cancel.emit();
  }
}
