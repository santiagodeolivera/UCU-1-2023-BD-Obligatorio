import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NecessityDetailPageComponent } from './pages/necessity-detail-page/necessity-detail-page.component';

const routes: Routes = [
  { path: '', component: NecessityDetailPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NecessityDetailRoutingModule { }
