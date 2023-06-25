import { Component, Input, OnInit } from '@angular/core';
import { GoogleMapsGeolocation } from 'src/app/modules/core/classes';
import { INecessity } from 'src/app/modules/core/interfaces';
import { AuthService } from 'src/app/modules/core/services/auth.service';
import { MapService } from 'src/app/modules/core/services/map.service';

@Component({
  selector: 'app-necessity-card',
  templateUrl: './necessity-card.component.html',
  styleUrls: ['./necessity-card.component.scss']
})
export class NecessityCardComponent implements OnInit {
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

    return locationString ? locationString : `(${location?.latitude}; ${location?.longitude})`;
  }

  get necessityDescription(): string {
    const necessityDescription = this.necessity.description?.replace(/\n/g, '<br>') || '';

    if (necessityDescription.length > 100) {
      return `${necessityDescription.substring(0, 100)}...`;
    }

    return necessityDescription;
  }

  get isByRunningUser(): boolean {
    return this.necessity.userId !== this.authService.runningUser?.id;
  }

  constructor(
    private mapService: MapService,
    private authService: AuthService
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
    ).subscribe({
      next: result => {
        this.necessity.location = result;
      },
      error: () => {}
    });
  }
}
