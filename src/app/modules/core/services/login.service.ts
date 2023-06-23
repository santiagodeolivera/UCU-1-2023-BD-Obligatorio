import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { IHTTPResponse, ILogin, User } from '../interfaces';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient, private us: UserService ) { }
  
  // generar login utilizando el servicio de usuario y validando en el backend que la contraseña sea correcta
  login(ci: string, hashPassword: string) : Observable<IHTTPResponse<ILogin>>{
    return of( { success: true, data: { token: 'test' } } )
    .pipe(
      catchError(err => of(err))
    )
    
  }

  /*login(ci: string, hashPassword: string) : Observable<IHTTPResponse<ILogin>>{
    this.us.getByCi(ci).subscribe(
      user => {
        localStorage.setItem('token', user.token);
      })
    return this.http.post<IHTTPResponse<ILogin>>('http://localhost:3000/api/v1/login', {ci, hashPassword});

    return of({ success: true, data: { token: 'test' } })
    .pipe(
      catchError(err => of(err))
    )
  }*/
  
  logout() {
    localStorage.removeItem('token');
  }

}
