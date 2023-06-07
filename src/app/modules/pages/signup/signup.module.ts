import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { SignupFormsComponent } from './components/signup-forms/signup-forms.component';
import { MaterialModule } from 'src/app/material.module';
import { SignupRoutingModule } from './signup-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SignupPageComponent,
    SignupFormsComponent,
  ],
  imports: [
    CommonModule, 
    SignupRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class SignupModule { }
