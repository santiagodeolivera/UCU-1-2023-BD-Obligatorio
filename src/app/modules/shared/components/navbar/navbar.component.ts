import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/modules/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() menuClick = new EventEmitter<void>();

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  handleMenuClick() {
    this.menuClick.emit();
  }

}
