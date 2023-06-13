import { Component, Input, OnInit } from '@angular/core';
import { GoogleMapsGeolocation } from 'src/app/modules/core/classes';
import { INecessity } from 'src/app/modules/core/interfaces';
import { MapService } from 'src/app/modules/core/services/map.service';

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

  get locationString(): string {
    const location = this.necessity.location;
    let locationString = location?.streetAddress ? location.streetAddress : '';
    locationString = location?.city ? `${locationString}, ${location?.city}` : locationString;
    locationString = location?.province ? `${locationString}, ${location?.province}` : locationString;
    locationString = location?.country ? `${locationString}, ${location?.country}` : locationString;

    return locationString ? locationString : `${location?.latitude}, ${location?.longitude}`;
  }

  constructor(
    private mapService: MapService
  ) { }

  ngOnInit(): void {
    this.getNecessityLocation();
  }

  getNecessityLocation() {
    if (!(this.necessity.location?.latitude && this.necessity.location.longitude)) return;

    this.mapService.getPlaceInformationFromCoordinates(
      this.necessity.location?.latitude,
      this.necessity.location?.longitude,
      GoogleMapsGeolocation
    ).subscribe(result => {
      this.necessity.location = result;
    });
  }

}
