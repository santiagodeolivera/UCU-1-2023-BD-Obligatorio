import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { IGeolocation } from '../interfaces';
import { environment } from 'src/environments/environment';

const GOOGLE_MAPS_BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(
    private http: HttpClient
  ) { }

  getPlaceInformationFromCoordinates<T extends IGeolocation>(lat: number, lng: number, constr: new (o: any) => T):Observable<T>  {
    return this.http.get(`${GOOGLE_MAPS_BASE_URL}?key=${environment.googleMapsKey}&latlng=${lat},${lng}`)
    .pipe(
      map((response: any): T => {
        return new constr(response);
      }),
      catchError(err => of(err))
    );
  }
}
