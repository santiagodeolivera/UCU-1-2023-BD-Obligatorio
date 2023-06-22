import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { IHTTPResponse, ISearchResult, IUser, IUserSearchRequest, User } from '../interfaces';
import { USER_MOCK } from '../mocks/user.mock';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  runningUser?: IUser = USER_MOCK;
  private userUrl = 'http://localhost:3000/api/v1/users';
  constructor(private http: HttpClient) { }

  getByCi(ci : string) : Observable<User> {
    const url = `${this.userUrl}/${ci}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched user id=${ci}`)),
      catchError(this.handleError<User>(`getUser id=${ci}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  // TODO: implement better logging mechanism
  private log(message: string) {
    console.log(`UserService: ${message}`);
  }

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
