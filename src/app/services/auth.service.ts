import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {User} from '../models/user.model';

@Injectable()
export class AuthService {

  private API: string;
  private TOKEN = 'token';

  constructor(private router: Router,
              private http: HttpClient) {
    this.API = '';
  }

  signUp(userInfo: User) {
    firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(userInfo.email, userInfo.password)
      .then( (user) => {
        if(user) {
          firebase.auth().currentUser.updateProfile({
            displayName: userInfo.name,
            photoURL: ''
          }).then(
            ( s ) => {
              this.router.navigate(['']);
            }
          );
        }
        console.log(user);
      })
      .catch(
      error => console.log(error)
    );
  }

  login(email, password) {
    const body = {
      email: email,
      password: password
    };
    return this.http.post(this.API, body);
  }

  setSession(authData: any) {
    localStorage.setItem(this.TOKEN, JSON.stringify(authData['token']));
  }

  getToken() {
    return JSON.parse(localStorage.getItem(this.TOKEN));
  }

  isAuthenticated() {
    const token = localStorage.getItem(this.TOKEN);

    return token ? true : false;
  }

  revokeSession() {
    localStorage.removeItem(this.TOKEN);
  }

  logout() {
    this.revokeSession();
  }

}
