import { forkJoin, Observable, of } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { GoogleMapsGeolocation } from 'src/app/modules/core/classes';
import { INecessity, IUser } from 'src/app/modules/core/interfaces';
import { MapService } from 'src/app/modules/core/services/map.service';
import { NecessityService } from 'src/app/modules/core/services/necessity.service';
import { SnackbarService } from 'src/app/modules/core/services/snackbar.service';
import { UserService } from 'src/app/modules/core/services/user.service';


@Component({
  selector: 'app-user-info-detail',
  templateUrl: './user-info-detail.component.html',
  styleUrls: ['./user-info-detail.component.scss']
})
export class UserInfoDetailComponent implements OnInit {

  isLoading = false;
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
    private necessityService: NecessityService,
    private userService: UserService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.loadDataOnInit();
  }

  loadDataOnInit() {
    this.isLoading = true;
    forkJoin([this.getUserNecessities(), this.getUserLocation(), this.refreshUserSkills()])
    .subscribe({
      complete: () => this.isLoading = false,
      error: (err) => this.snackbarService.openSnackBar(
        'Ha ocurrido un error actualizando la información del usuario. Por favor refresca la página.',
        undefined, 2000)
    });
  }

  getUserNecessities() {
    const obs = this.necessityService.getNecessitiesByUser(this.user.id!);
    obs.subscribe(res => {
      if (!res.success) return;

      this.userNecessities = res.data;
    });

    return obs;
  }

  getUserLocation() {
    if (!(this.user.address?.latitude && this.user.address.longitude)) return of();

    const obs = this.mapService.getPlaceInformationFromCoordinates(
      this.user.address?.latitude,
      this.user.address?.longitude,
      GoogleMapsGeolocation
    );
    obs.subscribe(result => {
      this.user.address = result;
    });

    return obs;
  }

  refreshUserSkills() {
    this.isLoading = true;

    const obs = this.userService.setUserSkills(this.user);

    obs.subscribe({
      next: (result) => {
        this.user = result;
      }
    });

    return obs;
  }
}
