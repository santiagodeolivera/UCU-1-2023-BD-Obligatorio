import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { IGeolocation, INecessity, ISkill } from 'src/app/modules/core/interfaces';
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
export class NecessityFormComponent implements AfterViewInit {
  minDate: Date = new Date();

  necessityForm = this.fb.group({
    title: [ '', [ Validators.required, Validators.maxLength(80) ] ],
    description: [ '', Validators.maxLength(500) ],
    startDate: new FormControl<Date | undefined>(undefined, Validators.required), //Validators.min(new Date().getTime())
    endDate: new FormControl<Date | undefined>(undefined),
    requiredSkills: new FormControl<string[] | undefined>(undefined),
    location: new FormControl<IGeolocation | undefined>(undefined, Validators.required),
  });

  @ViewChild(MapComponent) map?: MapComponent;

  @Input() necessity?: INecessity;

  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<INecessity>();

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngAfterViewInit(): void {
    if (this.necessity) this.prepopulateForm();
  }

  prepopulateForm() {
    this.necessityForm.setValue({
      title: this.necessity?.title || null,
      description: this.necessity?.description || null,
      startDate: this.necessity?.startDate || null,
      endDate: this.necessity?.endDate || null,
      location: this.necessity?.location || null,
      requiredSkills: this.necessity?.skills?.map(skill => {
        return skill.id
      })
    });

    if (this.necessity?.location) {
      this.map?.setFocusedPosition(
        this.necessity.location
      );
    }
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
    const requiredSkills: ISkill[] | undefined = value.requiredSkills?.map(skill => {
      return { id: skill } as ISkill;
    });
    const necessity: INecessity = {
      userId: this.userService.runningUser?.id,
      title: value.title || undefined,
      description: value.description || undefined,
      startDate: value.startDate || undefined,
      endDate: value.endDate || undefined,
      location: value.location || undefined,
      skills: requiredSkills || undefined
    };

    this.save.emit(necessity);
  }

  handleCancel() {
    this.cancel.emit();
  }
}
