import { Injectable } from '@angular/core';
import { IHTTPResponse, ISkill } from '../interfaces';
import { Observable, catchError, forkJoin, map, of, single, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NecessityRequestHandler } from '../classes/NecessityRequestHandler';
import { UserService } from './user.service';


const SKILLS_ENDPOINT = 'skills';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  necessityRequestHandler: NecessityRequestHandler = new NecessityRequestHandler(this.http, this, this.userService);

  get necessitiesEndpoint(): string {
    return this.necessityRequestHandler.necessitiesEndpoint;
  }

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  getAllSkills(): Observable<IHTTPResponse<ISkill[]>> {
    return this.http.get<Observable<IHTTPResponse<ISkill[]>>>(`${environment.baseUrl}/${SKILLS_ENDPOINT}`)
    .pipe(
      catchError(err => of(err))
    );
  }

  createNecessitySkills(necessityId: string, skills: ISkill[]): Observable<IHTTPResponse<void>> {
    return this.http.post<Observable<IHTTPResponse<void>>>(
      `${environment.baseUrl}/${this.necessitiesEndpoint}/${necessityId}/${SKILLS_ENDPOINT}`,
      { skillNames: skills.map(skill => skill.name) }
    )
    .pipe(
      catchError(err => of(err))
    );
  }

  deleteNecessitySkills(necessityId: string, skills: ISkill[]): Observable<IHTTPResponse<void>> {
    return this.http.post<Observable<IHTTPResponse<void>>>(
      `${environment.baseUrl}/${this.necessitiesEndpoint}/${necessityId}/${SKILLS_ENDPOINT}/delete`,
      { skillNames: skills.map(skill => skill.name) }
    )
    .pipe(
      catchError(err => of(err))
    );
  }

  updateNecessitySkills(necessityId: string, skills: ISkill[]): Observable<IHTTPResponse<void>> {
    const updatedSkillsByName: Map<string, ISkill> = new Map();
    skills.forEach(skill => updatedSkillsByName.set(skill.name, skill));

    return this.necessityRequestHandler.getNecessityById(necessityId)
    .pipe(
      switchMap(res => {
        if (!res.success) return of(res);

        const skillsToDelete: ISkill[] = [];

        res.data!.skills?.forEach(skill => {
          if (updatedSkillsByName.has(skill.name)) {
            updatedSkillsByName.delete(skill.name);
          } else {
            skillsToDelete.push(skill);
          }
        });

        const skillsToCreate: ISkill[] = [ ...updatedSkillsByName.values() ];

        return forkJoin([
          this.createNecessitySkills(necessityId, skillsToCreate),
          this.deleteNecessitySkills(necessityId, skillsToDelete)
        ])
        .pipe(
          map(([ createResult, deleteResult ]) => {
            return {
              success: createResult.success && deleteResult.success
            };
          })
        );
      })
    );
  }

  createUserSkills(userId: string, skill: ISkill): Observable<IHTTPResponse<void>> {
    return this.http.post<Observable<IHTTPResponse<void>>>(
      `${environment.baseUrl}/users/${userId}/${SKILLS_ENDPOINT}`,
      { skillNames: skill.name }
    )
    .pipe(
      catchError(err => of(err))
    );
  }
  
  deleteUserSkills(userId: string, skill: ISkill): Observable<IHTTPResponse<void>> {
    return this.http.post<Observable<IHTTPResponse<void>>>(
      `${environment.baseUrl}/users/${userId}/${SKILLS_ENDPOINT}/delete`,
      { skillNames: skill.name }
    )
    .pipe(
      catchError(err => of(err))
    );
  }
}
