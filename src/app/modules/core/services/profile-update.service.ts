import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable, catchError, of, tap } from 'rxjs';
import { IHTTPResponse, IUser } from '../interfaces';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

const USERS_ENDPOINT = 'users';
@Injectable({
  providedIn: 'root'
})
export class ProfileUpdateService {
  
  constructor(private http: HttpClient,
    private userService: UserService) { }

  updateUser(userId: string, userData: IUser): Observable<IHTTPResponse<void>>{
    if (!userId) return of( { success: false } );
    return this.http.put<IHTTPResponse<void>>(`${environment.baseUrl}/${USERS_ENDPOINT}/${userId}`, userData)
    .pipe(
      catchError(err => of(err))
    );
  }

  /*getUser(userId: string): Observable<IHTTPResponse<IUser>>{
    if (!userId) return of( { success: false } );
    return this.http.get<IHTTPResponse<IUser>>(`${environment.baseUrl}/${USERS_ENDPOINT}/${userId}`)
    .pipe(
      catchError(err => of(err))
    );
  }*/

}
