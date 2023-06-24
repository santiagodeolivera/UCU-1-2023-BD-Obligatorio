import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {
  isLogin: boolean = true;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  navHome() { this.router.navigate(['/']); }
  navLogin() { this.router.navigate(['/login']); }
  navSignup() { this.router.navigate(['/signup']); }
  navUpdateProfile() { this.router.navigate(['/profileUpdate']); }
  navLogout() { this.router.navigate(['/logout']); }
  navAbout() { this.router.navigate(['/about']); }
  navCreateNecessity() { this.router.navigate(['/create-necessity']); }
  navCreateSkill() { this.router.navigate(['/postSkill']); }
  
}
