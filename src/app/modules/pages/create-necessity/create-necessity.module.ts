import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'src/app/material.module';

import { CreateNecessityRoutingModule } from './create-necessity-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { CreateNecessityPageComponent } from './pages/create-necessity-page/create-necessity-page.component';
import { CreateNecessityFormComponent } from './components/create-necessity-form/create-necessity-form.component';

@NgModule({
  declarations: [
    CreateNecessityPageComponent,
    CreateNecessityFormComponent
  ],
  imports: [
    CommonModule,
    CreateNecessityRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CreateNecessityModule { }
