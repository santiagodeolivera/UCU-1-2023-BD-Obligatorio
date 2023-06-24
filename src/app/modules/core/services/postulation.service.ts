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
    return this.getPostulations(necessityId, userId);
  }

  getPostulationsFromUser(userId: string): Observable<IHTTPResponse<IPostulation[]>> {
    return this.getPostulations(undefined, userId);
  }

  getPostulationsFromNecessity(necessityId: string): Observable<IHTTPResponse<IPostulation[]>> {
    return this.getPostulations(necessityId);
  }

  getPostulations(necessityId?: string, userId?: string) {
    let query = '';
    if (necessityId) {
      query += `?necessityId=${necessityId}`;
    }
    if (userId) {
      query += query ? `&userId=${necessityId}` : `?userId=${necessityId}`;
    }

    return this.http.get<IHTTPResponse<string>>(
      `${environment.baseUrl}/${POSTULATIONS_ENDPOINT}${query}`,
    )
    .pipe(
      catchError(err => of(err))
    );
  }

  createPostulation(newPostulation: IPostulation): Observable<IHTTPResponse<string>> {
    return this.http.post<IHTTPResponse<string>>(
      `${environment.baseUrl}/${POSTULATIONS_ENDPOINT}`,
      newPostulation
    )
    .pipe(
      catchError(err => of(err))
    );
  }

  deletePostulation(necessityId: string, userId: string): Observable<IHTTPResponse<void>> {
    return this.http.delete<IHTTPResponse<string>>(
      `${environment.baseUrl}/${POSTULATIONS_ENDPOINT}/${necessityId}/${userId}`,
    )
    .pipe(
      catchError(err => of(err))
    );
  }

  updatePostulation(postulation: IPostulation): Observable<IHTTPResponse<void>> {
    return this.http.put<IHTTPResponse<string>>(
      `${environment.baseUrl}/${POSTULATIONS_ENDPOINT}`,
      postulation
    )
    .pipe(
      catchError(err => of(err))
    );
  }

}
