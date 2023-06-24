import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'src/app/material.module';
import { MapComponent } from './components/map/map.component';
import { MapSearchBoxComponent } from './components/map-search-box/map-search-box.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NecessityFormComponent } from './components/necessity-form/necessity-form.component';
import { SkillsDropdownComponent } from './components/skills-dropdown/skills-dropdown.component';
import { SkillChipListComponent } from './components/skill-chip-list/skill-chip-list.component';
import { PostulationListComponent } from './components/postulation-list/postulation-list.component';
import { PostulationCardComponent } from './components/postulation-card/postulation-card.component';
import { SkillChipComponent } from './components/skill-chip/skill-chip.component';
import { SkillDialogComponent } from './components/skill-dialog/skill-dialog.component';
import { FixedSpinnerComponent } from './components/fixed-spinner/fixed-spinner.component';
import { NavbarDrawerContentComponent } from './components/navbar-drawer-content/navbar-drawer-content.component';


@NgModule({
  declarations: [
    MapComponent,
    MapSearchBoxComponent,
    NavbarComponent,
    NecessityFormComponent,
    SkillsDropdownComponent,
    SkillChipListComponent,
    PostulationListComponent,
    PostulationCardComponent,
    SkillChipComponent,
    SkillDialogComponent,
    FixedSpinnerComponent,
    NavbarDrawerContentComponent
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    MapComponent,
    NavbarComponent,
    NavbarDrawerContentComponent,
    NecessityFormComponent,
    SkillChipListComponent,
    PostulationListComponent,
    FixedSpinnerComponent,
    SkillsDropdownComponent
  ]
})
export class SharedModule { }
