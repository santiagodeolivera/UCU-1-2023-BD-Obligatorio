import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  mostrarHover: boolean = false;
  constructor() { }
  urlLogo = 'https://github.com/santiagodeolivera/UCU-1-2023-BD-Obligatorio/assets/88668277/0979832d-25f7-4c0f-aa55-e7b38bdf6197';
  urlImg1 = 'https://github.com/santiagodeolivera/UCU-1-2023-BD-Obligatorio/assets/88668277/4a54a0c4-c2fb-4053-b877-8cc0627d6702';
  urlImg2 = 'https://github.com/santiagodeolivera/UCU-1-2023-BD-Obligatorio/assets/88668277/b6056454-f64d-472c-972e-5436779caa48';
  urlImg3 = 'https://github.com/santiagodeolivera/UCU-1-2023-BD-Obligatorio/assets/88668277/9ec63ac5-257a-40ba-b198-e31f5d46db96';
  urlImg4 = 'https://github.com/santiagodeolivera/UCU-1-2023-BD-Obligatorio/assets/88668277/1b1f2553-8af5-4aeb-9f28-d0da178b143f';
  ngOnInit(): void {
  }

  navigateLogin() {
    window.location.href = 'login'
  }
  mostrarTexto() {
    this.mostrarHover = true;
  }
  
  ocultarTexto() {
    this.mostrarHover = false;
  }

}
