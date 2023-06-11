import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileUpdateComponent } from './pages/profile-update/profile-update.component';
import { ProfileUpdateFormComponent } from './component/profile-update-form/profile-update-form.component';
import { SignupRoutingModule } from '../signup/signup-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileUpdateService } from '../../core/services/profile-update.service';



@NgModule({
  declarations: [
    ProfileUpdateComponent,
    ProfileUpdateFormComponent
  ],
  providers: [
    ProfileUpdateService
  ],
  imports: [
    CommonModule,
    SignupRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ProfileUpdateModule { }
