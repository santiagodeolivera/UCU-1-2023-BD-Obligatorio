import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostSkillComponent } from './pages/post-skill/post-skill.component';

const routes: Routes = [
    { path: '', component: PostSkillComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostSkillRoutingModule { }