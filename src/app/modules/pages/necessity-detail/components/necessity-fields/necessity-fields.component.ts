import { Component, Input, OnInit } from '@angular/core';
import { GoogleMapsGeolocation } from 'src/app/modules/core/classes';
import { INecessity } from 'src/app/modules/core/interfaces';
import { AuthService } from 'src/app/modules/core/services/auth.service';
import { MapService } from 'src/app/modules/core/services/map.service';
import { PostulationService } from 'src/app/modules/core/services/postulation.service';

@Component({
  selector: 'app-necessity-fields',
  templateUrl: './necessity-fields.component.html',
  styleUrls: ['./necessity-fields.component.scss']
})
export class NecessityFieldsComponent implements OnInit {
  isApprovedNecessity: boolean = false;

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

  get isByRunningUser(): boolean {
    return this.necessity.userId !== this.authService.runningUser?.id;
  }

  constructor(
    private mapService: MapService,
    private authService: AuthService,
    private postulationService: PostulationService
  ) { }

  ngOnInit(): void {
    this.getNecessityLocation();
    if (!this.isByRunningUser) this.getPostulationForUser();
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

  getPostulationForUser() {
    this.postulationService.getPostulationForUserAndNecessity(this.necessity.id!, this.authService.runningUser?.id!)
    .subscribe(result => {
      if (!result.success) return;

      this.isApprovedNecessity = result.success && result.data?.status === 'Aprobada';
    });
  }

}
