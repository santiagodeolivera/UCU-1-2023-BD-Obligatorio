import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  createUser(user : User) : Observable<
  {
    success: boolean,
    data?:string
    message?: string,
    error?: { message: string }
  }> {
    return this.http.post<
    {
      success: boolean,
      data?:string
      message?: string,
      error?: { message: string }
    }>('../i', user);
  }


}

