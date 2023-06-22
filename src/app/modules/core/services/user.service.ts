import { Injectable } from '@angular/core';
import { IHTTPResponse, ISearchResult, IUser, IUserSearchRequest } from '../interfaces';
import { USER_MOCK } from '../mocks/user.mock';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  runningUser?: IUser = USER_MOCK;

  constructor() { }

  getUsersByFilters(filters: IUserSearchRequest): Observable<IHTTPResponse<ISearchResult[]>> {

    return of<IHTTPResponse<IUser[]>>({
      success: true,
      data: [ USER_MOCK, USER_MOCK ]
    })
    .pipe(
      map(res => {
        if (!res.success) return res;

        return {
          data: res.data!.map(user => {
            return {
              title: user.name,
              skills: user.skills,
              url: `/users/${user.id}`
            } as ISearchResult;
          }),
          success: res.success
        };
      }),
      catchError(err => of(err))
    );
  }
}
