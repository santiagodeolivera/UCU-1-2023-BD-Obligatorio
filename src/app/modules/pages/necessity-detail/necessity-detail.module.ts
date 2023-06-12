import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NecessityDetailRoutingModule } from './necessity-detail-routing.module';
import { NecessityDetailPageComponent } from './pages/necessity-detail-page/necessity-detail-page.component';
import { NecessityFieldsComponent } from './components/necessity-fields/necessity-fields.component';
import { MaterialModule } from 'src/app/material.module';
import { NecessityDetailActionsComponent } from './components/necessity-detail-actions/necessity-detail-actions.component';
import { SharedModule } from '../../shared/shared.module';
import { NecessityPostulationListComponent } from './components/necessity-postulation-list/necessity-postulation-list.component';


@NgModule({
  declarations: [
    NecessityDetailPageComponent,
    NecessityFieldsComponent,
    NecessityDetailActionsComponent,
    NecessityPostulationListComponent
  ],
  imports: [
    CommonModule,
    NecessityDetailRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class NecessityDetailModule { }
