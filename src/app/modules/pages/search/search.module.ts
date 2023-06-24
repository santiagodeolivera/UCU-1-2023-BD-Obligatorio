import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SearchRoutingModule } from './search-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { SearchComponent } from './pages/search/search.component';
import { UserSearchComponent } from './pages/user-search/user-search.component';
import { NecessitySearchComponent } from './pages/necessity-search/necessity-search.component';

import { SearchResultListComponent } from './components/search-result-list/search-result-list.component';
import { SearchResultItemComponent } from './components/search-result-item/search-result-item.component';
import { UserSearchFormComponent } from './components/user-search-form/user-search-form.component';
import { NecessitySearchFormComponent } from './components/necessity-search-form/necessity-search-form.component';
import { SearchSelectComponent } from './components/search-select/search-select.component';


@NgModule({
  declarations: [
    SearchComponent,
    UserSearchComponent,
    NecessitySearchComponent,
    SearchResultListComponent,
    SearchResultItemComponent,
    UserSearchFormComponent,
    NecessitySearchFormComponent,
    SearchSelectComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SearchModule { }
