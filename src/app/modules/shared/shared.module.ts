import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoogleMapsModule } from '@angular/google-maps';
import { MapComponent } from './components/map/map.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    MaterialModule
  ],
  exports: [
    MapComponent
  ]
})
export class SharedModule { }
