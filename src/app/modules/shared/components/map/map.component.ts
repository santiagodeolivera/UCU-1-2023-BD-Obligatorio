import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

import { GoogleMapsGeolocation } from 'src/app/modules/core/classes';
import { IGeolocation } from 'src/app/modules/core/interfaces';
import { LocationService } from 'src/app/modules/core/services/location.service';
import { MapSearchBoxComponent } from '../map-search-box/map-search-box.component';

const GOOGLE_MAPS_KEY = 'AIzaSyA54hOBFif3kxMjxNcSMld8Kx4UYD0j5KU';
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
  @Input() enableSearch: boolean = true;

  @Output() mapClick = new EventEmitter<IGeolocation>();
  @Output() mapSearch = new EventEmitter<IGeolocation>();

  @ViewChild(GoogleMap) map?: GoogleMap;
  @ViewChild(MapSearchBoxComponent) searchBox?: MapSearchBoxComponent;

  get hasCoordinates(): boolean {
    return this.initialCoordinates.lat !== 0 && this.initialCoordinates.lng !== 0;
  }

  constructor(
    private locationService: LocationService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    if (!this.hasCoordinates) this.centerMapOnUserLocation();
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

  setSearchBox($event: ElementRef) {
    this.map?.controls[google.maps.ControlPosition.TOP_CENTER].push(
      $event.nativeElement
    );
  }

  handleMapClick($event: google.maps.MapMouseEvent) {
    const lat = $event.latLng?.lat();
    const lng = $event.latLng?.lng();

    this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${GOOGLE_MAPS_KEY}&latlng=${lat},${lng}`)
    .subscribe((result: any): void => {
      if (result?.results?.length > 0) {
        const place = result.results[0] as google.maps.places.PlaceResult;
        const location = new GoogleMapsGeolocation(place);

        this.mapClick.emit(location);
        this.searchBox?.setPlaceName(location.locationName);
        return;
      }

      const location: IGeolocation = {
        latitude: lat,
        longitude: lng
      };
      this.mapClick.emit(location);
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
  }
}
