import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NecessityDetailPageComponent } from './pages/necessity-detail-page/necessity-detail-page.component';
import { NecessityEditPageComponent } from './pages/necessity-edit-page/necessity-edit-page.component';

const routes: Routes = [
  { path: 'edit', component: NecessityEditPageComponent },
  { path: '', component: NecessityDetailPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NecessityDetailRoutingModule { }
