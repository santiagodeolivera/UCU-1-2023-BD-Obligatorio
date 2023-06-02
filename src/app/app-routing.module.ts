import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent as CompetitionsComp } from './competition/dashboard/dashboard.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "competitions", component: CompetitionsComp }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
