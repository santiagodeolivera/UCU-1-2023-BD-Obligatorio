import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleMapsGeolocation } from 'src/app/modules/core/classes';
import { INecessity, IUser } from 'src/app/modules/core/interfaces';
import { AuthService } from 'src/app/modules/core/services/auth.service';
import { MapService } from 'src/app/modules/core/services/map.service';
import { NecessityService } from 'src/app/modules/core/services/necessity.service';


@Component({
  selector: 'app-user-info-detail',
  templateUrl: './user-info-detail.component.html',
  styleUrls: ['./user-info-detail.component.scss']
})
export class UserInfoDetailComponent implements OnInit {
  
  userNecessities?: INecessity[];
  
  get runningUser(): IUser {
    return this.authService.runningUser!;
  }

  get locationString(): string {
    const location = this.runningUser.address;
    let locationString = location?.streetAddress ? location.streetAddress : '';
    locationString = location?.city ? `${locationString}, ${location?.city}` : locationString;
    locationString = location?.province ? `${locationString}, ${location?.province}` : locationString;
    locationString = location?.country ? `${locationString}, ${location?.country}` : locationString;

    return locationString ? locationString : `${location?.latitude}, ${location?.longitude}`;
  }
  
  constructor(
    private mapService: MapService,
    private authService: AuthService,
    private router: Router,
    private necessityService: NecessityService
  ) { }
    
  ngOnInit(): void {
    this.getUserLocation();
    this.getUserNecessities();
  }

  getUserNecessities() {
    this.necessityService.getNecessitiesByUser(this.runningUser.id!)
    .subscribe(res => {
      if (!res.success) return;

      this.userNecessities = res.data;
    });;
  }

  getUserLocation() {
    if (!(this.runningUser.address?.latitude && this.runningUser.address.longitude)) return;

    this.mapService.getPlaceInformationFromCoordinates(
      this.runningUser.address?.latitude,
      this.runningUser.address?.longitude,
      GoogleMapsGeolocation
    )
    .subscribe(result => {
      this.runningUser.address = result;
    });
  }

}
