import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

import { LocationService } from 'src/app/modules/core/services/location.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  isLoading = false;
  mapConfigurations = {
    disableDefaultUI: true,
    fullscreenControl: true,
    zoomControl: true
  }

  @Input() initialCoordinates = { lat: 0, lng: 0 };
  @Input() hasSearch: boolean = true;

  @ViewChild('mapSearchField') searchField?: ElementRef;
  @ViewChild(GoogleMap) map?: GoogleMap;

  get hasCoordinates(): boolean {
    return this.initialCoordinates.lat !== 0 && this.initialCoordinates.lng !== 0;
  }

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    if (!this.hasCoordinates) this.centerMapOnUserLocation();
  }

  ngAfterViewInit(): void {
    if (this.hasSearch) this.setSearchBox();
  }

  centerMapOnUserLocation() {
    this.isLoading = true;

    this.locationService.getCurrentPosition()
    .then(location => {
      this.initialCoordinates.lat = location.coords.latitude;
      this.initialCoordinates.lng = location.coords.longitude;
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => this.isLoading = false);
  }

  setSearchBox() {
    const searchBox = new google.maps.places.SearchBox(
      this.searchField?.nativeElement
    );
    this.map?.controls[google.maps.ControlPosition.TOP_CENTER].push(
      this.searchField?.nativeElement
    );
  }

}
