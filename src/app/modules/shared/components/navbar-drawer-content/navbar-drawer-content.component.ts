import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/core/services/auth.service';

@Component({
  selector: 'app-navbar-drawer-content',
  templateUrl: './navbar-drawer-content.component.html',
  styleUrls: ['./navbar-drawer-content.component.scss']
})
export class NavbarDrawerContentComponent implements OnInit {

  @Output() closeDrawer = new EventEmitter();

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
    .then(
      () => this.closeDrawer.emit()
    );
  }

  navHome()             { this.router.navigate(['/']); }
  navSearch()           { this.router.navigate(['/search']); }
  navCreateNecessity()  { this.router.navigate(['/create-necessity']); }

  // navUpdateProfile() { this.router.navigate(['/profileUpdate']); }
  // navAbout() { this.router.navigate(['/about']); }
  navCreateSkill() { this.router.navigate(['/postSkill']); }

}
