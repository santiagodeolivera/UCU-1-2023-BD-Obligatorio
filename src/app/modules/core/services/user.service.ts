import { Injectable, OnInit } from '@angular/core';
import { IUser, User } from '../interfaces';
import { USER_MOCK } from '../mocks/user.mock';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  runningUser?: IUser = USER_MOCK;

  private userUrl = 'http://localhost:3000/api/v1/users';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) { }
    
  getByCi(ci : string) : Observable<User> {
    const url = `${this.userUrl}/${ci}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched user id=${ci}`)),
      catchError(this.handleError<User>(`getUser id=${ci}`))
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl).pipe(
      tap(_ => this.log('fetched users')),
      catchError(this.handleError<User[]>('getUsers'))
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
