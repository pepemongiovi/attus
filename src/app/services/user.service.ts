import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../models/user.model';

@Injectable()
export class UserService {
  private API: string;

  constructor(private _http: HttpClient) {
    this.API = '';
  }

  createUser(u: User) {
    const user = new User(u.displayName, u.email, u.password);
    return this._http.post(this.API, user);
  }
}
