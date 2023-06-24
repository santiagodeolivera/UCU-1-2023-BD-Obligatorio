import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { IUser } from '../interfaces';
import { IHTTPResponse } from '../interfaces';
import { environment } from 'src/environments/environment';

const USERS_ENDPOINT = 'users';

@Injectable({
  providedIn: 'root'
})

export class SignupService {

  constructor(private http: HttpClient) { }

  createUser(user: IUser): Observable<IHTTPResponse<void>>{
    return this.http.post<IHTTPResponse<void>>(`${environment.baseUrl}/${USERS_ENDPOINT}`, user)
    .pipe(
      catchError(err => of(err))
    );
  }

}

