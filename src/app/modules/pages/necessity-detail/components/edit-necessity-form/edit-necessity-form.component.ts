import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INecessity } from 'src/app/modules/core/interfaces';
import { NecessityService } from 'src/app/modules/core/services/necessity.service';
import { SnackbarService } from 'src/app/modules/core/services/snackbar.service';

@Component({
  selector: 'app-edit-necessity-form',
  templateUrl: './edit-necessity-form.component.html',
  styleUrls: ['./edit-necessity-form.component.scss']
})
export class EditNecessityFormComponent implements OnInit {
  isLoading: boolean = false;

  @Input() necessity!: INecessity;

  constructor(
    private router: Router,
    private necessityService: NecessityService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
  }

  handleCancel() {
    this.router.navigate([`/necessities/${this.necessity.id}`]);
  }

  handleSave($event: INecessity) {
    this.necessityService.updateNecessity($event)
    .subscribe(result => {
      if (result.success) {
        this.router.navigate([`/necessities/${this.necessity.id}`])
        .then(() => {
          this.snackbarService.openSnackBar(
            'Necesidad actualizada exitosamente.',
            undefined, 2000
          );
        });
        return;
      }

      this.snackbarService.openSnackBar(
        'Hubo un error al actualizar la necesidad. Intenta de nuevo más tarde.',
        'Aceptar'
      );
    });
  }
}
