import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

import { GoogleMapsGeolocation } from 'src/app/modules/core/classes';
import { IGeolocation } from 'src/app/modules/core/interfaces';
import { LocationService } from 'src/app/modules/core/services/location.service';
import { MapSearchBoxComponent } from '../map-search-box/map-search-box.component';
import { MapService } from 'src/app/modules/core/services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  mapConfigurations: google.maps.MapOptions = {
    disableDefaultUI: true,
    fullscreenControl: false,
    zoomControl: true
  }
  isLoading: boolean = false;
  focusedPosition?: { lat: number, lng: number } = undefined;

  @Input() initialCoordinates = { lat: 0, lng: 0 };
  @Input() position?: IGeolocation;
  @Input() enableSearch: boolean = true;
  @Input() queryLocationOnClick: boolean = false;

  @Output() mapClick = new EventEmitter<IGeolocation>();
  @Output() mapSearch = new EventEmitter<IGeolocation>();

  @ViewChild(GoogleMap) map?: GoogleMap;
  @ViewChild(MapSearchBoxComponent) searchBox?: MapSearchBoxComponent;

  get hasCoordinates(): boolean {
    return this.initialCoordinates.lat !== 0 && this.initialCoordinates.lng !== 0;
  }

  get locationString(): string {
    const location = this.position;
    let locationString = location?.streetAddress ? location.streetAddress : '';
    locationString = location?.city ? `${locationString}, ${location?.city}` : locationString;
    locationString = location?.province ? `${locationString}, ${location?.province}` : locationString;
    locationString = location?.country ? `${locationString}, ${location?.country}` : locationString;

    return locationString ? locationString : `${location?.latitude}, ${location?.longitude}`;
  }

  constructor(
    private locationService: LocationService,
    private mapService: MapService
  ) { }

  ngOnInit(): void {
    if (!this.hasCoordinates) this.centerMapOnUserLocation();
  }

  centerMapOnUserLocation() {
    this.isLoading = true;

    this.locationService.getCurrentPosition()
    .then(location => {
      if (this.hasCoordinates) return;

      this.initialCoordinates = {
        lat: location.coords.latitude,
        lng: location.coords.longitude
      };
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => this.isLoading = false);
  }

  setSearchBox($event: ElementRef) {
    this.map?.controls[google.maps.ControlPosition.TOP_CENTER].push(
      $event.nativeElement
    );
  }

  handleMapClick($event: google.maps.MapMouseEvent) {
    const lat = $event.latLng?.lat();
    const lng = $event.latLng?.lng();

    const baseLocation: IGeolocation = {
      latitude: lat,
      longitude: lng
    };

    if (!this.queryLocationOnClick) {
      this.mapClick.emit(baseLocation);
      return;
    }

    this.mapService.getPlaceInformationFromCoordinates<GoogleMapsGeolocation>(lat!, lng!, GoogleMapsGeolocation)
    .subscribe({
      next: (location) => {
        this.mapClick.emit(location);
        this.searchBox?.setPlaceName(location.locationName);
      },
      error: (e) => {
        this.mapClick.emit(baseLocation);
      },
    });
  }

  handlePlacesChange(place: google.maps.places.PlaceResult) {
    if (!this.enableSearch || !place) return;

    const searchResult = new GoogleMapsGeolocation(place);
    this.mapSearch.emit(searchResult);

    this.map?.fitBounds(searchResult.bounds);
  }

  public setFocusedPosition(position: IGeolocation) {
    this.focusedPosition = {
      lat: position.latitude!,
      lng: position.longitude!
    };

    this.initialCoordinates = { ...this.focusedPosition };
  }
}
