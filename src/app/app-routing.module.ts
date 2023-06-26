import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidateTokenGuard } from './modules/core/guard/validate-token.guard';
import { PreventLogoutGuard } from './modules/core/guard/prevent-logout.guard';

const routes: Routes = [
  {
    path: 'signup',
    loadChildren: () => import('./modules/pages/signup/signup.module').then( m => m.SignupModule ),
    canActivate: [ PreventLogoutGuard ],
    canLoad: [ PreventLogoutGuard ]
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/pages/login/login.module').then( m => m.LoginModule ),
    canActivate: [ PreventLogoutGuard ],
    canLoad: [ PreventLogoutGuard ]
  },
  {
    path: 'profile-update',
    loadChildren: () => import('./modules/pages/profileUpdate/profile-update.module').then( m => m.ProfileUpdateModule ),
    canActivate: [ ValidateTokenGuard ],
    canLoad: [ ValidateTokenGuard ]
  },
  {
    path: 'create-necessity',
    loadChildren: () => import('./modules/pages/create-necessity/create-necessity.module').then( m => m.CreateNecessityModule ),
    canActivate: [ ValidateTokenGuard ],
    canLoad: [ ValidateTokenGuard ]
  },
  {
    path: 'necessities/:id',
    loadChildren: () => import('./modules/pages/necessity-detail/necessity-detail.module').then( m => m.NecessityDetailModule ),
    canActivate: [ ValidateTokenGuard ],
    canLoad: [ ValidateTokenGuard ]
  },
  {
    path: 'postSkill',
    loadChildren: () => import('./modules/pages/post-skill/post-skill.module').then( m => m.PostSkillModule ),
    canActivate: [ ValidateTokenGuard ],
    canLoad: [ ValidateTokenGuard ]
  },
  {
    path: 'search',
    loadChildren: () => import('./modules/pages/search/search.module').then( m => m.SearchModule ),
    canActivate: [ ValidateTokenGuard ],
    canLoad: [ ValidateTokenGuard ]
  },
  {
    path: '**',
    loadChildren: () => import('./modules/pages/home/home.module').then( m => m.HomeModule ),
    canActivate: [ ValidateTokenGuard ],
    canLoad: [ ValidateTokenGuard ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
