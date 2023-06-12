import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { IGeolocation, INecessity } from 'src/app/modules/core/interfaces';
import { UserService } from 'src/app/modules/core/services/user.service';

import { MapComponent } from 'src/app/modules/shared/components/map/map.component';

const UY_DATE_FORMAT = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-necessity-form',
  templateUrl: './necessity-form.component.html',
  styleUrls: ['./necessity-form.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: UY_DATE_FORMAT },
    { provide: MAT_DATE_LOCALE, useValue: 'es-UY' }
  ]
})
export class NecessityFormComponent implements OnInit {
  minDate: Date = new Date();

  necessityForm = this.fb.group({
    title: [ '', [ Validators.required, Validators.maxLength(80) ] ],
    description: [ '', Validators.maxLength(500) ],
    startDate: new FormControl<Date | undefined>(undefined, Validators.required), //Validators.min(new Date().getTime())
    endDate: new FormControl<Date | undefined>(undefined),
    location: new FormControl<IGeolocation | undefined>(undefined, Validators.required)
  });

  @ViewChild(MapComponent) map?: MapComponent;

  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<INecessity>();

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  handleMapClick($event: IGeolocation) {
    this.necessityForm.controls.location.setValue($event);
    this.map?.setFocusedPosition($event);
  }

  handleMapSearch($event: IGeolocation) {
    this.necessityForm.controls.location.setValue($event);
    this.map?.setFocusedPosition($event);
  }

  handleSubmit() {
    if (!this.necessityForm.valid) return;

    const value = this.necessityForm.value;
    const necessity: INecessity = {
      userId: this.userService.runningUser?.userId,
      title: value.title || undefined,
      description: value.description || undefined,
      startDate: value.startDate || undefined,
      endDate: value.endDate || undefined,
      location: value.location || undefined
    }

    this.save.emit(necessity);
  }

  handleCancel() {
    this.cancel.emit();
  }
}
