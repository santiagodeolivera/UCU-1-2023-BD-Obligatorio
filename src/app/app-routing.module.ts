import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'create-necessity',
    loadChildren: () => import('./modules/pages/create-necessity/create-necessity.module').then( m => m.CreateNecessityModule ),
    //canActivate: GUARDS GO HERE,
    //canLoad: GUARDS GO HERE
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
