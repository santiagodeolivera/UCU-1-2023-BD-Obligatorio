import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';

import { MapComponent } from './components/map/map.component';
import { MaterialModule } from 'src/app/material.module';
import { MapSearchBoxComponent } from './components/map-search-box/map-search-box.component';
import { NecessityFormComponent } from './components/necessity-form/necessity-form.component';

@NgModule({
  declarations: [
    MapComponent,
    MapSearchBoxComponent,
    NecessityFormComponent
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    MapComponent,
    NecessityFormComponent
  ]
})
export class SharedModule { }
