import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { INecessity } from 'src/app/modules/core/interfaces';
import { NecessityService } from 'src/app/modules/core/services/necessity.service';
import { SnackbarService } from 'src/app/modules/core/services/snackbar.service';

@Component({
  selector: 'app-create-necessity-form',
  templateUrl: './create-necessity-form.component.html',
  styleUrls: ['./create-necessity-form.component.scss']
})
export class CreateNecessityFormComponent implements OnInit {
  isLoading: boolean = false;

  @Output() cancel = new EventEmitter<void>();

  constructor(
    private necessityService: NecessityService,
    private snackbarService: SnackbarService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  handleSave($event: INecessity) {
    this.isLoading = true;

    this.necessityService.createNecessity($event)
    .subscribe(response => {
      this.isLoading = false;

      if (response.success) {
        this.router.navigate([`/necessities/${response.data?.id}`]);
        return;
      }

      this.snackbarService.openSnackBar(
        'Hubo un error al crear la necesidad. Intenta nuevamente más tarde.',
        'Aceptar'
      );
    });
  }

  handleCancel() {
    this.cancel.emit();
    this.router.navigate(['']);
  }

}
