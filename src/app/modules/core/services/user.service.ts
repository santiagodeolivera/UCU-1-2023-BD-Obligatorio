import { Injectable } from '@angular/core';
import { IUser, IHTTPResponse,  User } from '../interfaces';
import { USER_MOCK } from '../mocks/user.mock';
import { Observable, catchError, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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

}
