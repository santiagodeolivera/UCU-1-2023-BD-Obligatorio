import { Injectable } from '@angular/core';
import { IAuthRequest, IAuthResponse, IUser } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const AUTH_ENDPOINT = `${environment.baseUrl}/auth`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  runningUser?: IUser;

  constructor(private http: HttpClient) { }

  doUserAuth(authRequest: IAuthRequest): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(AUTH_ENDPOINT, authRequest)
    .pipe(
      tap( response => {
        if (response.success) {
          this.runningUser = response.data?.user;
          localStorage.setItem('token', response.data?.token!);
        }
      }),
      catchError( err => of(err))
    );
  }

  validateToken(): Observable<any> {
    const url = `${ AUTH_ENDPOINT }/renew`;

    return this.http.get<IAuthResponse>( url )
      .pipe(
        tap( response => {
          if (response.success) {
            this.runningUser = response.data?.user;
            localStorage.setItem('token', response.data?.token!);
          }

          return response.success;
        }),
        catchError( err => of(false) )
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.runningUser = undefined;
  }
}
