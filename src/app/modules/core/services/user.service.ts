import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap, forkJoin, switchMap } from 'rxjs';

import { USER_MOCK } from '../mocks/user.mock';
import { IHTTPResponse, ISearchResult, ISkill, IUser, IUserSearchRequest, User } from '../interfaces';
import { environment } from 'src/environments/environment';

const USERS_ENDPOINT = 'users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = `${environment.baseUrl}/${USERS_ENDPOINT}`;

  constructor(
    private http: HttpClient
  ) { }

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
    let queryStr = '';
    const addToQueryParams = (qstr: string, name: string, value: any) => {
      let strValue = value;
      if (typeof value !== 'string') {
        strValue = JSON.stringify(value);
        strValue = strValue.substring(1, strValue.length - 1);
      }

      return qstr ? `${qstr}&${name}=${value}` : `?${name}=${strValue}`;
    };

    queryStr = filters.firstName ? addToQueryParams(queryStr, 'firstName', filters.firstName) : queryStr;
    queryStr = filters.lastName ? addToQueryParams(queryStr, 'lastName', filters.lastName) : queryStr;
    filters.skills?.forEach(skill => {
      queryStr = addToQueryParams(queryStr, 'skills', skill);
    });

    return this.http.get<IHTTPResponse<IUser[]>>(`${this.userUrl}/${queryStr}`)
    .pipe(
      catchError(err => of(err)),
      switchMap((res: IHTTPResponse<IUser[]>) => {
        if (!res.success || res.data?.length === 0) return of(res);

        const observableArr: Observable<IUser>[] = [];
        res.data?.forEach(user => {
          observableArr.push(this.setUserSkills(user));
        });

        return forkJoin(observableArr).pipe(
          switchMap((users: IUser[]) => of({ success: true, data: users }))
        );
      }),
      map(res => {
        if (!res.success) return res;

        return {
          data: res.data!.map(user => {
            return {
              title: `${user.firstName} ${user.lastName}`,
              skills: user.skills,
              url: `/users/${user.id}`
            } as ISearchResult;
          }),
          success: res.success
        };
      })
    );
  }

  setUserSkills(user: IUser): Observable<IUser> {
    return this.http.get<IHTTPResponse<{
      skillName: string,
      description?: string,
      creationDate: Date
    }[]>>(`${this.userUrl}/${user.id!}/skills`)
    .pipe(
      map(res => {
        if (!res.success || res.data?.length === 0) return user;

        user.skills = res.data?.map(skill => {
          return {
            name: skill.skillName,
            description: skill.description
          } as ISkill;
        });
        return user;
      })
    );
  }
}
