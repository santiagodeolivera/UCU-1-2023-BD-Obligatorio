import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/modules/core/interfaces';
import { AuthService } from 'src/app/modules/core/services/auth.service';
import { UserService } from 'src/app/modules/core/services/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  isLoading: boolean = false;
  user?: IUser;

  get isByRunningUser(): boolean {
    return this.user?.id === this.authService.runningUser?.id
  }

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.isLoading = true;

    const userId = this.route.snapshot.paramMap.get('id') || '';
    this.userService.getByCi(userId)
    .subscribe(result => {
      this.isLoading = false;

      if (result.success) {
        this.user = result.data;
        return;
      }

      this.router.navigate(['']);
    })
  }

  
}
