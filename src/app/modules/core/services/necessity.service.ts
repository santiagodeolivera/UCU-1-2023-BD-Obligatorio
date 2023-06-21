import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IHTTPResponse, INecessity, INecessitySearchRequest, ISearchResult } from '../interfaces';
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

  getNecessitiesByFilters(filters: INecessitySearchRequest): Observable<IHTTPResponse<ISearchResult[]>> {

    return of<IHTTPResponse<INecessity[]>>({
      success: true,
      data: [ NECESSITY_MOCK, NECESSITY_MOCK ]
    })
    .pipe(
      map(res => {
        if (!res.success) return res;

        return {
          data: res.data!.map(necessity => {
            return {
              title: necessity.title,
              content: necessity.description,
              skills: necessity.skills,
              url: `/necessities/${necessity.id}`
            } as ISearchResult;
          }),
          success: res.success
        };
      }),
      catchError(err => of(err))
    );
  }
}
