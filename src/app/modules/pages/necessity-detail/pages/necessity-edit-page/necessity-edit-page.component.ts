import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleMapsGeolocation } from 'src/app/modules/core/classes';
import { INecessity } from 'src/app/modules/core/interfaces';
import { AuthService } from 'src/app/modules/core/services/auth.service';
import { MapService } from 'src/app/modules/core/services/map.service';
import { NecessityService } from 'src/app/modules/core/services/necessity.service';

@Component({
  selector: 'app-necessity-edit-page',
  templateUrl: './necessity-edit-page.component.html',
  styleUrls: ['./necessity-edit-page.component.scss']
})
export class NecessityEditPageComponent implements OnInit {

  isLoading: boolean = false;
  necessity?: INecessity;

  constructor(
    private necessityService: NecessityService,
    private mapService: MapService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getNecessity();
  }

  getNecessity() {
    this.isLoading = true;

    const necessityId = this.route.snapshot.paramMap.get('id') || '';
    this.necessityService.getNecessityById(necessityId)
    .subscribe(result => {
      this.isLoading = false;

      if (!result.success) {
        this.router.navigate(['']);
      }

      this.necessity = result.data;
      if (
        this.necessity?.startDate! <= new Date() ||
        this.necessity?.userId !== this.authService.runningUser?.id
      ) {
        this.router.navigate([`/necessities/${this.necessity?.id}`]);
      }

      this.getNecessityLocation();
      return;
    });
  }

  getNecessityLocation() {
    if (!(this.necessity!.location?.latitude && this.necessity!.location.longitude)) return;

    this.mapService.getPlaceInformationFromCoordinates(
      this.necessity!.location?.latitude,
      this.necessity!.location?.longitude,
      GoogleMapsGeolocation
    ).subscribe(result => {
      this.necessity!.location = result;
    });
  }

}
