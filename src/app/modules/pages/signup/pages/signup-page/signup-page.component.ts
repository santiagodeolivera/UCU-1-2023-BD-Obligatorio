import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SignupService } from 'src/app/modules/core/services/signup.service';
import { IUser } from 'src/app/modules/core/interfaces';
import { SnackbarService } from 'src/app/modules/core/services/snackbar.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent implements OnInit {

  isLoading = false;

  constructor(
    private router: Router,
    private signupService: SignupService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
  }

  handleSubmit($event: IUser) {
    this.isLoading = true;

    this.signupService.createUser($event)
    .subscribe(result => {
      this.isLoading = false;
      if (result.success) {

        this.router.navigate(['/login'])
        .then(() => this.snackbarService.openSnackBar(
          'Te has registrado exitósamente!',
          undefined,
          2000
        ));
        return;
      }

      this.snackbarService.openSnackBar(
        'Ha ocurrido un error al crear tu usuario, intenta de nuevo más tarde.',
        'Aceptar'
      );
    });
  }

  handleCancel() {
    this.router.navigate(['/login']);
  }
}
