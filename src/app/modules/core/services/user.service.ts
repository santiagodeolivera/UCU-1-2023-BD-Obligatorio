import { Injectable } from '@angular/core';
import { IUser } from '../interfaces';
import { USER_MOCK } from '../mocks/user.mock';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  runningUser?: IUser = USER_MOCK;

  constructor() { }
}
