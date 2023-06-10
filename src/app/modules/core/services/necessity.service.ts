import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs'

import { IHTTPResponse, INecessity } from 'src/app/modules/core/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NecessityService {

  constructor() { }

  createNecessity(necessity: INecessity): Observable<IHTTPResponse>{
    return of({ success: true });
  }
}
