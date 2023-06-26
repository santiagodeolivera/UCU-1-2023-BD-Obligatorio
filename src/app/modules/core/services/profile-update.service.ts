import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { IHTTPResponse, IUser } from '../interfaces';
import { environment } from 'src/environments/environment';

const USERS_ENDPOINT = 'users';
@Injectable({
  providedIn: 'root'
})
export class ProfileUpdateService {

  constructor(private http: HttpClient) { }

  updateUser(user: IUser): Observable<IHTTPResponse<void>>{
    return this.http.put<IHTTPResponse<void>>(`${environment.baseUrl}/${USERS_ENDPOINT}/${user.id!}`, user)
    .pipe(
      catchError(err => of(err))
    );
  }

}
