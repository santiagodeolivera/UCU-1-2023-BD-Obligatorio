import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'create-necessity',
    loadChildren: () => import('./modules/pages/create-necessity/create-necessity.module').then( m => m.CreateNecessityModule ),
    //canActivate: GUARDS GO HERE,
    //canLoad: GUARDS GO HERE
  },
  {
    path: 'necessities/:id',
    loadChildren: () => import('./modules/pages/necessity-detail/necessity-detail.module').then( m => m.NecessityDetailModule ),
    //canActivate: GUARDS GO HERE,
    //canLoad: GUARDS GO HERE
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
