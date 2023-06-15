import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userUrl = 'http://localhost:3000/api/v1/users';
  constructor(private http: HttpClient ) { }

  login(ci: string, password: string) : Observable<
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
    }>(url, { ci, password });
  }
  
  logout() {
    localStorage.removeItem('token');
  }

}
