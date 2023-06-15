import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileUpdateService {
  private userUrl = 'http://localhost:3000/api/v1/users';
  constructor(private http: HttpClient) { }

  updateUser(user : User) : Observable<
  {
    success: boolean,
    data?:string
    message?: string,
    error?: { message: string }
  }> {
    const url = `${this.userUrl}/${user.ci}`;
    return this.http.put<
    {
      success: boolean,
      data?:string
      message?: string,
      error?: { message: string }
    }>(url, user);
  }

  //get user from mock
  getUserProfile(ci : string) : Observable<User> {
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
