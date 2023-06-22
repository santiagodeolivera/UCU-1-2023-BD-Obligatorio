import { Injectable } from '@angular/core';
import { IHTTPResponse, ISkill } from '../interfaces';
import { Observable, catchError, of } from 'rxjs';
import { SKILLS_MOCK } from '../mocks/skills.mock';

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
}
