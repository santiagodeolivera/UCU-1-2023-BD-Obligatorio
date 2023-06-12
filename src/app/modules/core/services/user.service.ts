import { Injectable } from '@angular/core';
import { IUser } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  runningUser?: IUser;

  constructor() { }
}
