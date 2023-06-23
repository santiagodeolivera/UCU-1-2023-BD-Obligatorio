import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'signup',
    loadChildren: () => import('./modules/pages/signup/signup.module').then( m => m.SignupModule ),
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/pages/login/login.module').then( m => m.LoginModule ),
  },
  {
    path: 'profile-update',
    loadChildren: () => import('./modules/pages/profileUpdate/profile-update.module').then( m => m.ProfileUpdateModule ),
  },
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
  },
  {
    path: 'postSkill',
    loadChildren: () => import('./modules/pages/post-skill/post-skill.module').then( m => m.PostSkillModule ),
    //canActivate: GUARDS GO HERE,
    //canLoad: GUARDS GO HERE
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
