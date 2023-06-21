import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNecessityPageComponent } from './pages/create-necessity-page/create-necessity-page.component';

const routes: Routes = [
  { path: '', component: CreateNecessityPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateNecessityRoutingModule { }
