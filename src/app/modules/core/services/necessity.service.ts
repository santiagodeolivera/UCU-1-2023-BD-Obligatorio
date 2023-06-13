import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IHTTPResponse, INecessity } from '../interfaces';
import { NECESSITY_MOCK } from '../mocks/necessity.mock';


const NECESSITIES_ENDPOINT = 'necessities';
@Injectable({
  providedIn: 'root'
})
export class NecessityService {

  constructor(
    private http: HttpClient
  ) { }

  createNecessity(necessity: INecessity): Observable<IHTTPResponse<INecessity>>{
    return of({ success: true, data: { id: 'test' } })
    .pipe(
      catchError(err => of(err))
    );
  }

  updateNecessity(necessity: INecessity): Observable<IHTTPResponse<void>> {
    return of({
      success: true
    });
  }

  deleteNecessity(necessityId: string): Observable<IHTTPResponse<void>> {
    return of({
      success: true
    });
  }

  getNecessityById(necessityId: string): Observable<IHTTPResponse<INecessity>> {
    return of({
      success: true,
      data: NECESSITY_MOCK
    });
    // Use this when the backend is complete.
    // return this.http.get<IHTTPResponse<INecessity>>(`${environment.baseUrl}/${NECESSITIES_ENDPOINT}/${necessityId}`)
    // .pipe(
    //   catchError(err => of(err))
    // );
  }
}
