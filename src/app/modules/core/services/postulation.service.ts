import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { IHTTPResponse, IPostulation } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const POSTULATIONS_ENDPOINT = 'postulations';
@Injectable({
  providedIn: 'root'
})
export class PostulationService {

  constructor(
    private http: HttpClient
  ) { }

  createPostulation(newPostulation: IPostulation): Observable<IHTTPResponse<string>> {
    return of({
      success: true,
      data: '123'
    });

    //Use this when the backend is complete.
    // return this.http.post<IHTTPResponse<string>>(
    //   `${environment.baseUrl}/${POSTULATIONS_ENDPOINT}/${newPostulation.necessityId}`,
    //   newPostulation
    // )
    // .pipe(
    //   catchError(err => of(err))
    // );
  }

}
