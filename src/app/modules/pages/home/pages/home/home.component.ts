import { Component, OnInit } from '@angular/core';

import { INecessity, IPostulation, IUser } from 'src/app/modules/core/interfaces';
import { AuthService } from 'src/app/modules/core/services/auth.service';
import { NecessityService } from 'src/app/modules/core/services/necessity.service';
import { PostulationService } from 'src/app/modules/core/services/postulation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userPostulations?: IPostulation[];
  userNecessities?: INecessity[];

  get runningUser(): IUser {
    return this.authService.runningUser!;
  }

  constructor(
    private authService: AuthService,
    private postulationService: PostulationService,
    private necessityService: NecessityService
  ) { }

  ngOnInit(): void {
    this.getUserPostulations();
    this.getUserNecessities();
  }

  getUserPostulations() {
    this.postulationService.getPostulationsFromUser(this.runningUser.id!)
    .subscribe(res => {
      if (!res.success) return;

      this.userPostulations = res.data;
    });
  }

  getUserNecessities() {
    this.necessityService.getNecessitiesByUser(this.runningUser.id!)
    .subscribe(res => {
      if (!res.success) return;

      this.userNecessities = res.data;
    });;
  }
}
