import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginFormsComponent } from '../login-forms/login-forms.component';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/modules/core/services/login.service';
import { AuthService } from 'src/app/modules/core/services/auth.service';
import { User } from 'src/app/modules/core/interfaces';
import { UserService } from 'src/app/modules/core/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isEditMode: boolean = false;
  isOwnProfile: boolean = false;
  isUpdatingFilters: boolean = false;
  isLoading: boolean = false;
  user!: User;
  
  @ViewChild('loginForm')
  formData!: LoginFormsComponent;

  constructor(private fb: FormBuilder,
    private router : Router,
    private userService : UserService,
    private route : ActivatedRoute,
    private authService : AuthService,
    private snackBar: MatSnackBar){  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.isLoading = true;
    let ci = this.route.snapshot.paramMap.get('ci');

    if (!ci) {
      ci = this.authService.runningUser!.ci!;
    }

    this.userService.getByCi(ci)
    .subscribe(result => {
      this.isLoading = false;

      /*if (result.success) {
        this.user = result.data!;
        this.isOwnProfile = this.user.ci === this.authService.runningUser!.ci;
        return;
      }*/

      this.snackBar.open(`An error ocurred while retrieving the profile for ${ci}.`
      , '', { duration: 3000 });

      this.router.navigate(['/']);
    });
  }
  login() {
    this.isLoading = true;
    this.authService.doUserAuth(this.formData)
    .subscribe(result => {
      this.isLoading = false;

      if (result.success) {
        this.router.navigate(['/']);
        return;
      }

      this.snackBar.open(`An error ocurred while trying to login. Please try again later.`
      , '', { duration: 3000 });
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
  
}
