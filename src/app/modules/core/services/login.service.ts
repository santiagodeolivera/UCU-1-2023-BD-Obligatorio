import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient ) { }

  login(ci: string, password: string) : Observable<
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
    }>('../i', { ci, password });
  }
  
  logout() {
    localStorage.removeItem('token');
  }

}
