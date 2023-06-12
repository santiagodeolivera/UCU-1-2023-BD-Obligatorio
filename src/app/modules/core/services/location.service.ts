import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  disableGeolocation: boolean = false;

  get hasGeolocation(): boolean {
    if (this.disableGeolocation) return false;
    if (navigator.geolocation) return true;
    return false;
  }

  constructor() {  }

  getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
        if (!this.hasGeolocation) reject();

        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    );
  }
}
