import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IPostulation } from 'src/app/modules/core/interfaces';
import { PostulationService } from 'src/app/modules/core/services/postulation.service';
import { SnackbarService } from 'src/app/modules/core/services/snackbar.service';

@Component({
  selector: 'app-postulation-list',
  templateUrl: './postulation-list.component.html',
  styleUrls: ['./postulation-list.component.scss']
})
export class PostulationListComponent implements OnInit {

  @Input() postulations: IPostulation[] = [];
  @Input() isRunningUserNecessity: boolean = false;

  @Output() postulationUpdate = new EventEmitter<void>();

  constructor(
    private postulationService: PostulationService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
  }

  handlePostulationDelete($event: IPostulation) {
    this.postulationService.deletePostulation($event.necessityId!, $event.userId!)
    .subscribe(result => {
      if (result.success) {
        this.snackbarService.openSnackBar(
          'Postulación eliminada exitosamente.',
          undefined, 2000
        );

        this.postulationUpdate.emit();
        return;
      }

      this.snackbarService.openSnackBar(
        'Hubo un error al eliminar la postulación. Intenta de nuevo más tarde.',
        'Aceptar'
      );
    });
  }

  updatePostulationStatus($event: IPostulation) {
    this.postulationService.updatePostulation($event)
    .subscribe(result => {
      if (result.success) {
        this.snackbarService.openSnackBar(
          'Postulación actualizada exitosamente.',
          undefined, 2000
        );

        this.postulationUpdate.emit();
        return;
      }

      this.snackbarService.openSnackBar(
        'Hubo un error al actualizar la postulación. Intenta de nuevo más tarde.',
        'Aceptar'
      );
    });
  }

}
