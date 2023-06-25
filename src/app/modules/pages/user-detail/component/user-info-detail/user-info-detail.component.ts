import { Component, Input, OnInit } from '@angular/core';
import { GoogleMapsGeolocation } from 'src/app/modules/core/classes';
import { INecessity, IUser } from 'src/app/modules/core/interfaces';
import { AuthService } from 'src/app/modules/core/services/auth.service';
import { MapService } from 'src/app/modules/core/services/map.service';

@Component({
  selector: 'app-user-info-detail',
  templateUrl: './user-info-detail.component.html',
  styleUrls: ['./user-info-detail.component.scss']
})
export class UserInfoDetailComponent implements OnInit {
  @Input() user!: IUser;
  @Input() isRunningUser!: boolean;
  @Input() necessities!: INecessity[];
  
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
    private authService: AuthService,
  ) { }
    
  ngOnInit(): void {
    this.getUserLocation();
  }
    
  get isByRunningUser(): boolean {
    return this.user.id !== this.authService.runningUser?.id;
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
