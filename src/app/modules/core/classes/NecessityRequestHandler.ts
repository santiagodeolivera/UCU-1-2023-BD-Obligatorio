import { HttpClient } from '@angular/common/http';
import { Observable, catchError, forkJoin, map, of, switchMap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IHTTPResponse, INecessity, INecessitySearchRequest, ISearchResult, ISkill } from '../interfaces';
import { SerializedNecessity } from '../classes';
import { SkillsService } from '../services/skills.service';
import { UserService } from '../services/user.service';

export class NecessityRequestHandler {
  readonly necessitiesEndpoint = 'necessities';

  instance?: NecessityRequestHandler;

  constructor(
    private http: HttpClient,
    private skillsService: SkillsService,
    private userService: UserService
  ) {}

  createNecessity(necessity: INecessity): Observable<IHTTPResponse<string>>{
    return this.http.post<IHTTPResponse<string>>(`${environment.baseUrl}/${this.necessitiesEndpoint}`, necessity)
    .pipe(
      catchError(err => of(err)),
      switchMap((res: IHTTPResponse<string>) => {
        if (!res.success || !necessity.skills) return of(res);


        return this.skillsService.createNecessitySkills(res.data!, necessity.skills)
        .pipe(
          catchError(err => of(err)),
          map(skillsRes => res)
        );
      })
    );
  }

  updateNecessity(necessity: INecessity, updateSkills = true): Observable<IHTTPResponse<void>> {
    const necessityUpdate = this.http.put<IHTTPResponse<void>>(`${environment.baseUrl}/${this.necessitiesEndpoint}/${necessity.id}`, necessity)
    const observableArray = [ necessityUpdate ];

    if (updateSkills) {
      const skillsUpdate = this.skillsService.updateNecessitySkills(necessity.id!, necessity.skills!);
      observableArray.push(skillsUpdate);
    }

    return forkJoin(observableArray)
    .pipe(
      map(([ necessityUpdateRes, skillsUpdateRes ]) => {
        return necessityUpdateRes;
      })
    );
  }

  deleteNecessity(necessityId: string): Observable<IHTTPResponse<void>> {
    return this.http.delete<IHTTPResponse<INecessity>>(`${environment.baseUrl}/${this.necessitiesEndpoint}/${necessityId}`)
    .pipe(
      catchError(err => of(err))
    );
  }

  getNecessityById(necessityId: string): Observable<IHTTPResponse<INecessity>> {
    return this.http.get<IHTTPResponse<INecessity>>(`${environment.baseUrl}/${this.necessitiesEndpoint}/${necessityId}`)
    .pipe(
      catchError(err => of(err)),
      map((res: IHTTPResponse<INecessity>) => {
        if (!res.success) return res;

        res.data = new SerializedNecessity(res.data!);
        return res;
      }),
      switchMap((res: IHTTPResponse<INecessity>) => {
        if (!res.success) return of(res);

        return forkJoin([ this.setNecessitySkills(res.data!), this.userService.getUserById(res.data?.userId!) ])
        .pipe(
          map(([ necessity, response ]) => {
            if (response.success) {
              necessity.user = response.data;
            }

            return { data: necessity, success: true };
          })
        );
      })
    );
  }

  getNecessitiesByFilters(filters: INecessitySearchRequest): Observable<IHTTPResponse<ISearchResult[]>> {
    let queryStr = '';
    const addToQueryParams = (qstr: string, name: string, value: any) => {
      let strValue = value;
      if (typeof value !== 'string') {
        strValue = JSON.stringify(value);
        strValue = strValue.substring(1, strValue.length - 1);
      }

      return qstr ? `${qstr}&${name}=${value}` : `?${name}=${strValue}`;
    };

    queryStr = filters.startDate?.min ? addToQueryParams(queryStr, 'startDateMin', filters.startDate.min) : queryStr;
    queryStr = filters.startDate?.max ? addToQueryParams(queryStr, 'startDateMax', filters.startDate.max) : queryStr;
    queryStr = filters.endDate?.min ? addToQueryParams(queryStr, 'endDateMin', filters.endDate.min) : queryStr;
    queryStr = filters.endDate?.max ? addToQueryParams(queryStr, 'endDateMax', filters.endDate.max) : queryStr;
    queryStr = filters.searchTerm ? addToQueryParams(queryStr, 'searchTerm', filters.searchTerm) : queryStr;
    filters.skills?.forEach(skill => {
      queryStr = addToQueryParams(queryStr, 'skills', skill);
    });

    return this.http.get<IHTTPResponse<INecessity[]>>(`${environment.baseUrl}/${this.necessitiesEndpoint}/${queryStr}`)
    .pipe(
      catchError(err => of(err)),
      switchMap((res: IHTTPResponse<INecessity[]>) => {
        if (!res.success || res.data?.length === 0) return of(res);

        const observableArr: Observable<INecessity>[] = [];
        res.data?.forEach(necessity => {
          observableArr.push(this.setNecessitySkills(necessity));
        });

        return forkJoin(observableArr).pipe(
          catchError(err => of(res.data!)),
          switchMap((necessities: INecessity[]) => of({ success: true, data: necessities }))
        );
      }),
      map(res => {
        if (!res.success) return res;

        return {
          data: res.data!.map(necessity => {
            necessity = new SerializedNecessity(necessity);

            const startDateStr = necessity.startDate?.toLocaleDateString() || '';
            const endDateStr = necessity.endDate?.toLocaleDateString() || '';
            const dateStr = startDateStr === endDateStr || !endDateStr ? `${startDateStr}` : `${startDateStr} - ${endDateStr}`;
            const content = `${dateStr}<br><br>${necessity.description}`;

            return {
              title: necessity.title,
              content: content,
              skills: necessity.skills,
              url: `/necessities/${necessity.id}`,
              relatedUserId: necessity.userId
            } as ISearchResult;
          }),
          success: res.success
        };
      })
    );
  }

  getNecessitiesByUser(userId: string): Observable<IHTTPResponse<INecessity[]>> {
    return this.http.get<IHTTPResponse<INecessity[]>>(`${environment.baseUrl}/users/${userId}/${this.necessitiesEndpoint}`)
    .pipe(
      catchError(err => of(err)),
      switchMap((res: IHTTPResponse<INecessity[]>) => {
        if (!res.success || res.data?.length === 0) return of(res);

        const observableArr: Observable<INecessity>[] = [];
        res.data?.forEach(necessity => {
          observableArr.push(this.setNecessitySkills(new SerializedNecessity(necessity)));
        });

        return forkJoin(observableArr).pipe(
          catchError(err => of(res.data!)),
          switchMap((necessities: INecessity[]) => of({ success: true, data: necessities }))
        );
      })
    );
  }

  setNecessitySkills(necessity: INecessity): Observable<INecessity> {
    return this.http.get<IHTTPResponse<ISkill[]>>(`${environment.baseUrl}/${this.necessitiesEndpoint}/${necessity.id!}/skills`)
    .pipe(
      map(res => {
        if (!res.success || res.data?.length === 0) return necessity;

        necessity.skills = typeof res.data![0] !== 'string' ? res.data : res.data!.map(skill => {
          return { name: skill as unknown as string } as ISkill;
        });
        return necessity;
      })
    );
  }
}
