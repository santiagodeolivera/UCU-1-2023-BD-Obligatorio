import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { SignupFormsComponent } from './components/signup-forms/signup-forms.component';
import { MaterialModule } from 'src/app/material.module';
import { SignupRoutingModule } from './signup-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupService } from '../../core/services/signup.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    SignupPageComponent,
    SignupFormsComponent,
  ],
  providers: [
    SignupService
  ],
  imports: [
    CommonModule, 
    SignupRoutingModule,
    GoogleMapsModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class SignupModule { }