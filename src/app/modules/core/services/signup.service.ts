import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { ILogin } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class SignupService implements ILogin{
  private userUrl = 'http://localhost:3000/api/v1/users';
  constructor(private http: HttpClient) { }
  ci!: string;
  hashPassword!: string;

  /*createUser(ci: string, name: string, surname: string, urlPictureID: string, hashPassword: string, isAdmin: boolean, phone: string, geoDistance: number, geoState: boolean, email: string, city:string, state: string, address: string) : Observable<
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
    }>('../i', {ci, name, surname, urlPictureID, hashPassword, isAdmin, phone, geoDistance, geoState, email, city, state, address});
  }*/
  
  createUser(user: User): Observable<
  {
    success: boolean,
    data?:string
    message?: string,
    error?: { message: string }
  }> {
    const url = `${this.userUrl}`;
    return this.http.post<
    {
      success: boolean,
      data?:string
      message?: string,
      error?: { message: string }
    }>(url, user);
  }
  login(ci: string, hashPassword: string): Observable<
  {
    success: boolean,
    data?:string
    message?: string,
    error?: { message: string }
  }> {
    const url = `${this.userUrl}`;
    return this.http.post<
    {
      success: boolean,
      data?:string
      message?: string,
      error?: { message: string }
    }>(url , {ci, hashPassword});
  }



}

