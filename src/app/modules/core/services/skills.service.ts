import { Injectable } from '@angular/core';
import { IHTTPResponse, ISkill } from '../interfaces';
import { Observable, catchError, of } from 'rxjs';
import { SKILLS_MOCK } from '../mocks/skills.mock';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor() { }

  getAllSkills(): Observable<IHTTPResponse<ISkill[]>> {
    return of({ success: true, data: SKILLS_MOCK })
    .pipe(
      catchError(err => of(err))
    );
  }

  /*

  //Con API

  private skillUrl = 'http://localhost:3000/api/skills';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) { }

  getAllSkills(): Observable<ISkill[]> {
    return this.http.get<ISkill[]>(this.skillUrl).pipe(
      tap(_ => this.log('fetched skills')),
      catchError(this.handleError<ISkill[]>('getSkills'))
    );
  }

  getSkill(name: string): Observable<ISkill> {
    const url = `${this.skillUrl}/${name}`;
    return this.http.get<ISkill>(url).pipe(
      tap(_ => this.log(`fetched skill name=${name}`)),
      catchError(this.handleError<ISkill>(`getSkill name=${name}`))
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
  }*/
}
