import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NecessityDetailRoutingModule } from './necessity-detail-routing.module';
import { NecessityDetailPageComponent } from './pages/necessity-detail-page/necessity-detail-page.component';
import { NecessityFieldsComponent } from './components/necessity-fields/necessity-fields.component';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    NecessityDetailPageComponent,
    NecessityFieldsComponent
  ],
  imports: [
    CommonModule,
    NecessityDetailRoutingModule,
    MaterialModule
  ]
})
export class NecessityDetailModule { }
