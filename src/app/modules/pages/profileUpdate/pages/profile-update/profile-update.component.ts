import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileUpdateService } from 'src/app/modules/core/services/profile-update.service';
import { IUser } from 'src/app/modules/core/interfaces';
import { ProfileUpdateFormComponent } from '../../component/profile-update-form/profile-update-form.component';
import { SnackbarService } from 'src/app/modules/core/services/snackbar.service';
import { AuthService } from 'src/app/modules/core/services/auth.service';

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
    public authService : AuthService) { }
  
  ngOnInit(): void {
  }

  handleSubmit($event: IUser) {
    this.isLoading = true;

    this.profileUpdateService.updateUser($event.id!, $event)
    .subscribe(response => {
      this.isLoading = false;

      if (response.success) {
        this.router.navigate(['/users/${this.authService.user?.id}'])
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
    this.router.navigate(['/users/${this.authService.user?.id}']);
  }
  
}
