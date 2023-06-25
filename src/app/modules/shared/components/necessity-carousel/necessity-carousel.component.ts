import { Component, Input, OnInit } from '@angular/core';
import { INecessity } from 'src/app/modules/core/interfaces';

@Component({
  selector: 'app-necessity-carousel',
  templateUrl: './necessity-carousel.component.html',
  styleUrls: ['./necessity-carousel.component.scss']
})
export class NecessityCarouselComponent implements OnInit {

  @Input() necessities!: INecessity[];

  constructor() { }

  ngOnInit(): void {
  }

}
