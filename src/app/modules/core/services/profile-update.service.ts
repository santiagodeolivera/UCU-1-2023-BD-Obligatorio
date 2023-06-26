import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable, catchError, of, tap } from 'rxjs';
import { IHTTPResponse, IUser } from '../interfaces';
import { environment } from 'src/environments/environment';

const USERS_ENDPOINT = 'users';
@Injectable({
  providedIn: 'root'
})
export class ProfileUpdateService {
  
  constructor(private http: HttpClient) { }

  updateUser(userId: string, userData: IUser): Observable<IHTTPResponse<void>>{
    if (!userId) return of( { success: false } );
    return this.http.put<IHTTPResponse<void>>(`${environment.baseUrl}/${USERS_ENDPOINT}/${userId}`, userData)
    .pipe(
      catchError(err => of(err))
    );
  }

  getUser(id:string): Observable<IHTTPResponse<IUser>>{
    if (!id) return of( { success: false } );
    return this.http.get<IHTTPResponse<IUser>>(`${environment.baseUrl}/${USERS_ENDPOINT}/${id}`)
    .pipe(
      catchError(err => of(err))
    );
  }

}
