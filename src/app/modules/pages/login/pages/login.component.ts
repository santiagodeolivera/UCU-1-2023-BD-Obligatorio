import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/modules/core/services/auth.service';
import { IAuthRequest } from 'src/app/modules/core/interfaces';
import { SnackbarService } from 'src/app/modules/core/services/snackbar.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private snackbarService: SnackbarService,
    private authService: AuthService,
  ){  }

  ngOnInit(): void {
  }

  handleLogin($event: IAuthRequest) {
    this.isLoading = true;

    this.authService.doUserAuth($event)
    .subscribe(result => {
      this.isLoading = false;

      if (result.success) {
        this.router.navigate(['/']);
        return;
      }

      this.snackbarService.openSnackBar(
        'Usuario o contraseña incorrectos. Intente nuevamente',
        undefined,
        1500
      );
    });
  }

}
