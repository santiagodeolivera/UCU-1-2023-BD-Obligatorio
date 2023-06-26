import { AuthService } from './../../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/modules/core/interfaces';
import { UserService } from 'src/app/modules/core/services/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  user?: IUser;
  isRunningUserDetail: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (!userId || userId === this.authService.runningUser?.id) {
      this.user = this.authService.runningUser;
      this.isRunningUserDetail = true;
      return;
    }

    this.userService.getUserById(userId)
    .subscribe(result => {
      if (result.success) {
        this.user = result.data!;
        return;
      }

      this.router.navigate([ '' ]);
    });
  }

}
