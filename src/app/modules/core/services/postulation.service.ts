import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { IHTTPResponse, IPostulation } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { POSTULATIONS_MOCK } from '../mocks/postulation.mock';
import { USER_MOCK } from '../mocks/user.mock';

const POSTULATIONS_ENDPOINT = 'postulations';
@Injectable({
  providedIn: 'root'
})
export class PostulationService {

  constructor(
    private http: HttpClient
  ) { }

  getPostulationForUserAndNecessity(necessityId: string, userId: string): Observable<IHTTPResponse<IPostulation>> {
    return of({
      success: true,
      data: {
        ...POSTULATIONS_MOCK[1],
        user: USER_MOCK,
        userId: USER_MOCK.id
      }
    })
  }

  getPostulationsFromNecessity(necessityId: string): Observable<IHTTPResponse<IPostulation[]>> {
    return of({
      success: true,
      data: POSTULATIONS_MOCK
    });
  }

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

  deletePostulation(necessityId: string, userId: string): Observable<IHTTPResponse<void>> {
    return of({
      success: true
    })
  }

  updatePostulation(postulation: IPostulation): Observable<IHTTPResponse<void>> {
    return of({
      success: true
    })
  }

}
