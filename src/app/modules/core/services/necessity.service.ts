import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, map, of, switchMap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IHTTPResponse, INecessity, INecessitySearchRequest, ISearchResult, ISkill } from '../interfaces';
import { SerializedNecessity } from '../classes';
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
    let queryStr = '';
    const addToQueryParams = (qstr: string, name: string, value: any) => {
      let strValue = value;
      if (typeof value !== 'string') {
        strValue = JSON.stringify(value);
        strValue = strValue.substring(1, strValue.length - 1);
      }

      return qstr ? `${qstr}&${name}=${value}` : `?${name}=${strValue}`;
    };

    queryStr = filters.startDate?.min ? addToQueryParams(queryStr, 'startDateMin', filters.startDate.min) : queryStr;
    queryStr = filters.startDate?.max ? addToQueryParams(queryStr, 'startDateMax', filters.startDate.max) : queryStr;
    queryStr = filters.endDate?.min ? addToQueryParams(queryStr, 'endDateMin', filters.endDate.min) : queryStr;
    queryStr = filters.endDate?.max ? addToQueryParams(queryStr, 'endDateMax', filters.endDate.max) : queryStr;
    queryStr = filters.searchTerm ? addToQueryParams(queryStr, 'searchTerm', filters.searchTerm) : queryStr;
    filters.skills?.forEach(skill => {
      queryStr = addToQueryParams(queryStr, 'skills', skill);
    });

    return this.http.get<IHTTPResponse<INecessity[]>>(`${environment.baseUrl}/${NECESSITIES_ENDPOINT}/${queryStr}`)
    .pipe(
      catchError(err => of(err)),
      switchMap((res: IHTTPResponse<INecessity[]>) => {
        if (!res.success || res.data?.length === 0) return of(res);

        const observableArr: Observable<INecessity>[] = [];
        res.data?.forEach(necessity => {
          observableArr.push(this.setNecessitySkills(necessity));
        });

        return forkJoin(observableArr).pipe(
          switchMap((necessities: INecessity[]) => of({ success: true, data: necessities }))
        );
      }),
      map(res => {
        if (!res.success) return res;

        return {
          data: res.data!.map(necessity => {
            necessity = new SerializedNecessity(necessity);

            const startDateStr = necessity.startDate?.toLocaleDateString() || '';
            const endDateStr = necessity.endDate?.toLocaleDateString() || '';
            const dateStr = startDateStr === endDateStr || !endDateStr ? `${startDateStr}` : `${startDateStr} - ${endDateStr}`;
            const content = `${dateStr}<br><br>${necessity.description}`;

            return {
              title: necessity.title,
              content: content,
              skills: necessity.skills,
              url: `/necessities/${necessity.id}`
            } as ISearchResult;
          }),
          success: res.success
        };
      })
    );
  }

  setNecessitySkills(necessity: INecessity): Observable<INecessity> {
    return this.http.get<IHTTPResponse<ISkill[]>>(`${environment.baseUrl}/${NECESSITIES_ENDPOINT}/${necessity.id!}/skills`)
    .pipe(
      map(res => {
        if (!res.success || res.data?.length === 0) return necessity;

        necessity.skills = typeof res.data![0] !== 'string' ? res.data : res.data!.map(skill => {
          return { name: skill as unknown as string } as ISkill;
        });
        return necessity;
      })
    );
  }
}
