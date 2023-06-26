import { Component, Input, OnInit } from '@angular/core';
import { GoogleMapsGeolocation } from 'src/app/modules/core/classes';
import { INecessity, IUser } from 'src/app/modules/core/interfaces';
import { MapService } from 'src/app/modules/core/services/map.service';
import { NecessityService } from 'src/app/modules/core/services/necessity.service';


@Component({
  selector: 'app-user-info-detail',
  templateUrl: './user-info-detail.component.html',
  styleUrls: ['./user-info-detail.component.scss']
})
export class UserInfoDetailComponent implements OnInit {

  userNecessities?: INecessity[];

  @Input() user!: IUser;
  @Input() enableEdit: boolean = false;

  get locationString(): string {
    const location = this.user.address;
    let locationString = location?.streetAddress ? location.streetAddress : '';
    locationString = location?.city ? `${locationString}, ${location?.city}` : locationString;
    locationString = location?.province ? `${locationString}, ${location?.province}` : locationString;
    locationString = location?.country ? `${locationString}, ${location?.country}` : locationString;

    return locationString ? locationString : `${location?.latitude}, ${location?.longitude}`;
  }

  constructor(
    private mapService: MapService,
    private necessityService: NecessityService
  ) { }

  ngOnInit(): void {
    this.getUserLocation();
    this.getUserNecessities();
  }

  getUserNecessities() {
    this.necessityService.getNecessitiesByUser(this.user.id!)
    .subscribe(res => {
      if (!res.success) return;

      this.userNecessities = res.data;
    });;
  }

  getUserLocation() {
    if (!(this.user.address?.latitude && this.user.address.longitude)) return;

    this.mapService.getPlaceInformationFromCoordinates(
      this.user.address?.latitude,
      this.user.address?.longitude,
      GoogleMapsGeolocation
    )
    .subscribe(result => {
      this.user.address = result;
    });
  }

}
