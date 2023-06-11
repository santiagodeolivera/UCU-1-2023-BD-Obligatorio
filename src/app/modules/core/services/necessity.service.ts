import { Injectable } from '@angular/core';

import { Observable, catchError, of } from 'rxjs'

import { IHTTPResponse, INecessity } from 'src/app/modules/core/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NecessityService {

  constructor() { }

  createNecessity(necessity: INecessity): Observable<IHTTPResponse<INecessity>>{
    return of({ success: true, data: { id: 'test' } })
    .pipe(
      catchError(err => of(err))
    );
  }
}
