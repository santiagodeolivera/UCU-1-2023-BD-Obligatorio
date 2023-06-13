import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { INecessity, IPostulation } from 'src/app/modules/core/interfaces';

import { NecessityService } from 'src/app/modules/core/services/necessity.service';
import { PostulationService } from 'src/app/modules/core/services/postulation.service';
import { SnackbarService } from 'src/app/modules/core/services/snackbar.service';
import { UserService } from 'src/app/modules/core/services/user.service';

@Component({
  selector: 'app-necessity-detail-page',
  templateUrl: './necessity-detail-page.component.html',
  styleUrls: ['./necessity-detail-page.component.scss']
})
export class NecessityDetailPageComponent implements OnInit {

  isLoading: boolean = false;
  necessity?: INecessity;

  get isByRunningUser(): boolean {
    return this.necessity?.userId === this.userService.runningUser?.id
  }

  constructor(
    private userService: UserService,
    private necessityService: NecessityService,
    private postulationService: PostulationService,
    private snackbarService: SnackbarService,
    private route: ActivatedRoute,
    private router: Router,
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

  deleteNecessity() {
    this.necessityService.deleteNecessity(this.necessity?.id!)
    .subscribe(result => {
      if (result.success) {
        this.router.navigate([''])
        .then(() => {
          this.snackbarService.openSnackBar(
            'La necesidad fue eliminada exitosamente.',
            undefined, 2000
          );
        });
        return;
      }

      this.snackbarService.openSnackBar(
        'Hubo un error al crear tu postulación. Intenta de nuevo más tarde.',
        'Aceptar'
      );
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

      this.snackbarService.openSnackBar(
        'Hubo un error al crear tu postulación. Intenta de nuevo más tarde.',
        'Aceptar'
      );
    });
  }

  navigateToEdit() {
    if (!this.isByRunningUser) return;

    this.router.navigate([ `/necessities/${this.necessity?.id}/edit` ])
  }
}
