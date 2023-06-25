import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IHTTPResponse, INecessity, INecessitySearchRequest, ISearchResult } from '../interfaces';
import { SkillsService } from './skills.service';
import { UserService } from './user.service';
import { NecessityRequestHandler } from '../classes/NecessityRequestHandler';

@Injectable({
  providedIn: 'root'
})
export class NecessityService {
  necessityRequestHandler: NecessityRequestHandler = new NecessityRequestHandler(this.http, this.skillsService, this.userService);

  constructor(
    private http: HttpClient,
    private skillsService: SkillsService,
    private userService: UserService
  ) { }

  createNecessity(necessity: INecessity): Observable<IHTTPResponse<string>>{
    return this.necessityRequestHandler.createNecessity(necessity);
  }

  updateNecessity(necessity: INecessity, updateSkills = true): Observable<IHTTPResponse<void>> {
    return this.necessityRequestHandler.updateNecessity(necessity, updateSkills);
  }

  deleteNecessity(necessityId: string): Observable<IHTTPResponse<void>> {
    return this.necessityRequestHandler.deleteNecessity(necessityId);
  }

  getNecessityById(necessityId: string): Observable<IHTTPResponse<INecessity>> {
    return this.necessityRequestHandler.getNecessityById(necessityId);
  }

  getNecessitiesByFilters(filters: INecessitySearchRequest): Observable<IHTTPResponse<ISearchResult[]>> {
    return this.necessityRequestHandler.getNecessitiesByFilters(filters);
  }

  getNecessitiesByUser(userId: string): Observable<IHTTPResponse<INecessity[]>> {
    return this.necessityRequestHandler.getNecessitiesByUser(userId);
  }
}
