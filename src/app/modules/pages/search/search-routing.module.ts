import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './pages/search/search.component';
import { UserSearchComponent } from './pages/user-search/user-search.component';
import { NecessitySearchComponent } from './pages/necessity-search/necessity-search.component';

const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'users', component: UserSearchComponent },
  { path: 'necessities', component: NecessitySearchComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
