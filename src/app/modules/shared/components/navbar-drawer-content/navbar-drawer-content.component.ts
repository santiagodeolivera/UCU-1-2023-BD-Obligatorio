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
    this.navigate('/login');
  }

  navHome()             { this.navigate('/'); }
  navSearch()           { this.navigate('/search'); }
  navCreateNecessity()  { this.navigate('/create-necessity'); }
  navCreateSkill()      { this.navigate('/postSkill'); }

  navigate(route: string) {
    this.router.navigate([ route ])
    .then(() => this.close());
  }

  close() {
    this.closeDrawer.emit();
  }
}
