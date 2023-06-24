import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './pages/login.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { LoginFormsComponent } from './component/login-forms/login-forms.component';
import { SharedModule } from '../../shared/shared.module';




@NgModule({
  declarations: [
    LoginComponent,
    LoginFormsComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class LoginModule { }
