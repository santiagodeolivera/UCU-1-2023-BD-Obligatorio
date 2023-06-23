import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }
  urlLogo = 'https://github.com/santiagodeolivera/UCU-1-2023-BD-Obligatorio/assets/88668277/0979832d-25f7-4c0f-aa55-e7b38bdf6197';
  ngOnInit(): void {
  }

  navigateLogin() {
    window.location.href = 'login'
  }

}
