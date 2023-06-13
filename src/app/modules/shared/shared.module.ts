import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';

import { MapComponent } from './components/map/map.component';
import { MaterialModule } from 'src/app/material.module';
import { MapSearchBoxComponent } from './components/map-search-box/map-search-box.component';
import { NecessityFormComponent } from './components/necessity-form/necessity-form.component';
import { SkillsDropdownComponent } from './components/skills-dropdown/skills-dropdown.component';
import { SkillChipListComponent } from './components/skill-chip-list/skill-chip-list.component';
import { PostulationListComponent } from './components/postulation-list/postulation-list.component';
import { PostulationCardComponent } from './components/postulation-card/postulation-card.component';

@NgModule({
  declarations: [
    MapComponent,
    MapSearchBoxComponent,
    NecessityFormComponent,
    SkillsDropdownComponent,
    SkillChipListComponent,
    PostulationListComponent,
    PostulationCardComponent
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    MapComponent,
    NecessityFormComponent,
    SkillChipListComponent,
    PostulationListComponent
  ]
})
export class SharedModule { }
