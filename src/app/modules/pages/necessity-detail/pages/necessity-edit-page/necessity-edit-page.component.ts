import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleMapsGeolocation } from 'src/app/modules/core/classes';
import { INecessity } from 'src/app/modules/core/interfaces';
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

      if (result.success) {
        this.necessity = result.data;
        this.getNecessityLocation();
        return;
      }

      this.router.navigate(['']);
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
