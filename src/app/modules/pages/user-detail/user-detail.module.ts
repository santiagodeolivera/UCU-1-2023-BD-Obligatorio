import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailRoutingModule } from './user-detail-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from '../../shared/shared.module';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { UserInfoDetailComponent } from './component/user-info-detail/user-info-detail.component';



@NgModule({
  declarations: [
    UserInfoComponent,
    UserInfoDetailComponent
  ],
  imports: [
    CommonModule,
    UserDetailRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class UserDetailModule { }
