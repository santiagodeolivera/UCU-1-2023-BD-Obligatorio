import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { INecessity, IPostulation } from 'src/app/modules/core/interfaces';

import { NecessityService } from 'src/app/modules/core/services/necessity.service';
import { PostulationService } from 'src/app/modules/core/services/postulation.service';

@Component({
  selector: 'app-necessity-detail-page',
  templateUrl: './necessity-detail-page.component.html',
  styleUrls: ['./necessity-detail-page.component.scss']
})
export class NecessityDetailPageComponent implements OnInit {

  isLoading: boolean = false;
  necessity?: INecessity;

  constructor(
    private necessityService: NecessityService,
    private postulationService: PostulationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getNecessity();
  }

  getNecessity() {
    this.isLoading = true;

    const necessityId = this.route.snapshot.paramMap.get('id') || '';
    this.necessityService.getNecessityById(necessityId)
    .subscribe(result => {
      this.isLoading = false;

      if (result.success) {
        this.necessity = result.data;
        return;
      }

      this.router.navigate(['']);
    });
  }

  handleNewPostulation($event: IPostulation) {
    this.isLoading = true;

    this.postulationService.createPostulation($event)
    .subscribe(result => {
      this.isLoading = false;

      if (result.success) {
        this.getNecessity();
        return;
      }

      // TODO: Show snackbar message
    });
  }
}
