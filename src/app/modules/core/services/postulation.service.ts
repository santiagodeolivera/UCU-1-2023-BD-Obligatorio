import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, map, of, switchMap } from 'rxjs';
import { IHTTPResponse, IPostulation } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import { NecessityService } from './necessity.service';

const POSTULATIONS_ENDPOINT = 'postulations';
@Injectable({
  providedIn: 'root'
})
export class PostulationService {

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private necessityService: NecessityService
  ) { }

  getPostulationForUserAndNecessity(necessityId: string, userId: string): Observable<IHTTPResponse<IPostulation>> {
    return this.getPostulations(necessityId, userId)
    .pipe(
      map(res => {
        if (!res.success || res.data?.length === 0) return { ...res, data: undefined };

        const mappedRes: IHTTPResponse<IPostulation> = {
          success: res.success,
          data: res.data![0]
        };

        return mappedRes;
      })
    );
  }

  getPostulationsFromUser(userId: string): Observable<IHTTPResponse<IPostulation[]>> {
    return this.getPostulations(undefined, userId);
  }

  getPostulationsFromNecessity(necessityId: string): Observable<IHTTPResponse<IPostulation[]>> {
    return this.getPostulations(necessityId);
  }

  getPostulations(necessityId?: string, userId?: string): Observable<IHTTPResponse<IPostulation[]>> {
    let query = '';
    if (necessityId) {
      query += `?necessityId=${necessityId}`;
    }
    if (userId) {
      query += query ? `&userId=${userId}` : `?userId=${userId}`;
    }

    return this.http.get<IHTTPResponse<IPostulation>>(
      `${environment.baseUrl}/${POSTULATIONS_ENDPOINT}${query}`,
    )
    .pipe(
      catchError(err => of(err)),
      switchMap((res: IHTTPResponse<IPostulation[]>) => {
        if (!res.success || res.data?.length === 0) return of(res);

        const observableArr: Observable<IPostulation>[] = [];
        res.data?.forEach(postulation => {
          observableArr.push(this.setPostulationUser(postulation), this.setPostulationNecessity(postulation));
        });

        return forkJoin(observableArr).pipe(
          catchError(err => of(res.data!)),
          switchMap((postulations: IPostulation[]) => of({ success: true, data: postulations }))
        );
      })
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
      `${environment.baseUrl}/${POSTULATIONS_ENDPOINT}/${postulation.necessityId}/${postulation.userId}`,
      postulation
    )
    .pipe(
      catchError(err => of(err))
    );
  }

  setPostulationUser(postulation: IPostulation): Observable<IPostulation> {
    return this.userService.getUserById(postulation.userId!)
    .pipe(
      map(res => {
        if (!res.success) return postulation;

        postulation.user = res.data;
        return postulation;
      })
    );
  }

  setPostulationNecessity(postulation: IPostulation): Observable<IPostulation> {
    return this.necessityService.getNecessityById(postulation.necessityId!)
    .pipe(
      map(res => {
        if (!res.success) return postulation;

        postulation.necessity = res.data;
        return postulation;
      })
    );
  }

}
