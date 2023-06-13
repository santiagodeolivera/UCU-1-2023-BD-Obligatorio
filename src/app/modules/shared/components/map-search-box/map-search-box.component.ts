import { AfterViewInit, Component, ElementRef, EventEmitter, Output, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-map-search-box',
  templateUrl: './map-search-box.component.html',
  styleUrls: ['./map-search-box.component.scss']
})
export class MapSearchBoxComponent implements AfterViewInit {

  searchBox?: google.maps.places.SearchBox;

  @ViewChild('mapSearchField') searchField?: ElementRef;

  @Input() searchBoxValue: string = '';

  @Output() searchBoxInit = new EventEmitter<ElementRef>();
  @Output() placesChange = new EventEmitter<google.maps.places.PlaceResult>();

  constructor() {}

  ngAfterViewInit(): void {
    this.handleSearchBoxInit();
  }

  handleSearchBoxInit() {
    this.searchBox = new google.maps.places.SearchBox(
      this.searchField?.nativeElement
    );

    this.searchBoxInit.emit(this.searchField);
    this.searchBox.addListener(
      'places_changed', () => this.handlePlacesChange()
    );
  }

  handlePlacesChange() {
    if (!this.searchBox) return;

    const places = this.searchBox?.getPlaces();
    if (!places?.length) return;

    places.forEach(place => {
      if (!place.geometry || !place.geometry.location) return;

      this.placesChange.emit(place);
    });
  }

  public setPlaceName(name: string) {
    const input = this.searchField?.nativeElement as HTMLInputElement;
    input.value = name;
  }
}
