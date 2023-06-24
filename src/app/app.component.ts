import { Component } from '@angular/core';

import { AuthService } from './modules/core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'obligatorio-bd';

  get showNavbar(): boolean {
    return this.authService.runningUser !== undefined;
  }

  constructor(
    private authService: AuthService
  ) { }
}
