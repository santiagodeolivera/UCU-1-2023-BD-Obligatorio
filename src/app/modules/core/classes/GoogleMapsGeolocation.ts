import { IGeolocation } from "../interfaces";

export class GoogleMapsGeolocation implements IGeolocation {
  latitude?: number;
  longitude?: number;
  country?: string;
  city?: string;
  province?: string;
  streetAddress?: string;
  bounds = new google.maps.LatLngBounds();

  get locationName(): string {
    return `${this.streetAddress?.trim() ? `${this.streetAddress.trim()}, ` : ''}${
              this.city?.trim() ? `${this.city.trim()}, ` : ''}${
              this.province?.trim() ? `${this.province.trim()}, ` : ''}${
              this.country?.trim() ? `${this.country.trim()}.` : ''}`;
  }

  constructor(place: google.maps.places.PlaceResult) {
    if (place.geometry?.location) {
      this.bounds.extend(place.geometry.location);
    } else {
      this.bounds.union(place.geometry?.viewport!);
    }

    this.latitude = this.bounds.getCenter().lat();
    this.longitude = this.bounds.getCenter().lng();

    let streetNumber = '';
    let streetName = '';
    place.address_components?.forEach(addrComp => {
      if (addrComp.types.includes('street_number')) {
        streetNumber = addrComp.long_name;
      } else if (addrComp.types.includes('route')) {
        streetName = addrComp.long_name;
      } else if (addrComp.types.includes('locality')) {
        this.city = addrComp.long_name;
      } else if (addrComp.types.includes('administrative_area_level_1')) {
        this.province = addrComp.long_name;
      } else if (addrComp.types.includes('country')) {
        this.country = addrComp.long_name;
      }
    });

    this.streetAddress = `${streetName} ${streetNumber}`;
  }
}
