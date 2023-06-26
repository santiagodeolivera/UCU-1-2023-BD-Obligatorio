import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostSkillFormComponent } from './component/post-skill-form/post-skill-form.component';
import { PostSkillComponent } from './pages/post-skill/post-skill.component';
import { PostSkillRoutingModule } from './post-skill-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NecessityDetailRoutingModule } from '../necessity-detail/necessity-detail-routing.module';



@NgModule({
  declarations: [
    PostSkillFormComponent,
    PostSkillComponent
  ],
  imports: [
    CommonModule,
    PostSkillRoutingModule,
    NecessityDetailRoutingModule,
    SharedModule,
    GoogleMapsModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class PostSkillModule { }
