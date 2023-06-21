import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fixed-spinner',
  templateUrl: './fixed-spinner.component.html',
  styleUrls: ['./fixed-spinner.component.scss']
})
export class FixedSpinnerComponent implements OnInit {

  @Input() hasOverlay: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
