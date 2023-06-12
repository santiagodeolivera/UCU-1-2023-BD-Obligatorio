import { Component, Input, OnInit } from '@angular/core';
import { INecessity } from 'src/app/modules/core/interfaces';

@Component({
  selector: 'app-necessity-fields',
  templateUrl: './necessity-fields.component.html',
  styleUrls: ['./necessity-fields.component.scss']
})
export class NecessityFieldsComponent implements OnInit {

  @Input() necessity!: INecessity;

  get dateString(): string {
    const startDateString = this.necessity.startDate?.toLocaleDateString();
    const endDateString = this.necessity.endDate?.toLocaleDateString();

    if (endDateString && startDateString !== endDateString) {
      return `${startDateString} - ${endDateString}`;
    }

    return `${startDateString}`;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
