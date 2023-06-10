import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { INecessity } from 'src/app/modules/core/interfaces';

import { NecessityService } from 'src/app/modules/core/services/necessity.service';

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
  selector: 'app-create-necessity-form',
  templateUrl: './create-necessity-form.component.html',
  styleUrls: ['./create-necessity-form.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: UY_DATE_FORMAT },
    { provide: MAT_DATE_LOCALE, useValue: 'es-UY' }
  ]
})
export class CreateNecessityFormComponent implements OnInit {
  minDate: Date = new Date();
  isLoading: boolean = false;

  createNecessityForm = this.fb.group({
    description: [ '', Validators.maxLength(500) ],
    startDate: new FormControl<Date | undefined>(undefined, Validators.required), //Validators.min(new Date().getTime())
    endDate: new FormControl<Date | undefined>(undefined),
    latLocation: new FormControl<number | undefined>(undefined),//Validators.required ],
    longLocation: new FormControl<number | undefined>(undefined)//Validators.required ]
  });

  constructor(
    private fb: FormBuilder,
    private necessityService: NecessityService
  ) { }

  ngOnInit(): void {
  }

  handleSubmit() {
    if (!this.createNecessityForm.valid) return;
    this.isLoading = true;

    const value = this.createNecessityForm.value;
    const necessity: INecessity = {
      description: value.description || undefined,
      startDate: value.startDate || undefined,
      endDate: value.endDate || undefined,
      location: {
        latitude: value.latLocation || undefined,
        longitude: value.longLocation || undefined
      },
    }

    this.necessityService.createNecessity(necessity)
    .subscribe(response => {
      this.isLoading = false;

      if (response.success) {

        return;
      }


    })
  }
}
