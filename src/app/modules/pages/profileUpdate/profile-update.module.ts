import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileUpdateComponent } from './pages/profile-update/profile-update.component';
import { ProfileUpdateFormComponent } from './component/profile-update-form/profile-update-form.component';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileUpdateService } from '../../core/services/profile-update.service';
import { ProfileUpdateRoutingModule } from './profile-update-routing.module';



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
    ProfileUpdateRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ProfileUpdateModule { }
