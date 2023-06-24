import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';

import { MapComponent } from './components/map/map.component';
import { MaterialModule } from 'src/app/material.module';
import { MapSearchBoxComponent } from './components/map-search-box/map-search-box.component';
import { NecessityFormComponent } from './components/necessity-form/necessity-form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SkillsDropdownComponent } from './components/skills-dropdown/skills-dropdown.component';
import { SkillChipListComponent } from './components/skill-chip-list/skill-chip-list.component';
import { PostulationListComponent } from './components/postulation-list/postulation-list.component';
import { PostulationCardComponent } from './components/postulation-card/postulation-card.component';
import { SkillChipComponent } from './components/skill-chip/skill-chip.component';
import { SkillDialogComponent } from './components/skill-dialog/skill-dialog.component';
import { NavMenuComponent } from './components/navbar/component/nav-menu/nav-menu.component';
import { FixedSpinnerComponent } from './components/fixed-spinner/fixed-spinner.component';

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
    NavMenuComponent,
    FixedSpinnerComponent
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
    NecessityFormComponent,
    SkillChipListComponent,
    PostulationListComponent,
    FixedSpinnerComponent,
    SkillsDropdownComponent
  ]
})
export class SharedModule { }
