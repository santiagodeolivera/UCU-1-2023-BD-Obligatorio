import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { ILogin } from '../interfaces';
import { IHTTPResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})

export class SignupService {

  constructor(private http: HttpClient) { }

  createUser(user : User) : Observable<IHTTPResponse<User>>{
    return this.http.post<IHTTPResponse<User>>('http://localhost:3000/users', user);
  }

}

