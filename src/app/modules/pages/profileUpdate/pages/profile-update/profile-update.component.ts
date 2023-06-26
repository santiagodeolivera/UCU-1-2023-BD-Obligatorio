import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileUpdateService } from 'src/app/modules/core/services/profile-update.service';
import { IUser } from 'src/app/modules/core/interfaces';
import { SnackbarService } from 'src/app/modules/core/services/snackbar.service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent implements OnInit {

  isLoading = false;

  constructor(
    private router: Router,
    private profileUpdateService : ProfileUpdateService,
    private snackbarService : SnackbarService,
  ) { }

  ngOnInit(): void {
  }

  handleSubmit($event: IUser) {
    this.isLoading = true;

    this.profileUpdateService.updateUser($event)
    .subscribe(response => {
      this.isLoading = false;

      if (response.success) {
        this.router.navigate([`/profile`])
        .then(() => this.snackbarService.openSnackBar(
          'Tu perfil se ha actualizado exitósamente!',
          undefined,
          2000
        ));
        return;
      }

      this.snackbarService.openSnackBar(
        'Hubo un error al actualizar el perfil. Intenta nuevamente más tarde.',
        'Aceptar'
      );
    });
  }

  handleCancel() {
    this.router.navigate(['/profile']);
  }

}
