import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {User} from '../models/user.model';

@Injectable()
export class AuthService {

  private API: string;
  private USER = 'user';

  constructor(private router: Router,
              private http: HttpClient) {
    this.API = '';
  }

  signUp(userInfo: User) {
    firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(userInfo.email, userInfo.password)
      .then( (user) => {
        if(user) {
          firebase.auth().currentUser.updateProfile({
            displayName: userInfo.displayName,
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

  login(user: User, closeDialog) {
    firebase.auth().signInAndRetrieveDataWithEmailAndPassword(user.email, user.password)
      .then((user) => {
        this.setSession(user);
        closeDialog;
      });
  }

  setSession(user) {
    localStorage.setItem(this.USER, JSON.stringify(user));

  }

  isAuthenticated() {
    const user = localStorage.getItem(this.USER);
    return user === null ? false : true;
  }

  revokeSession() {
    localStorage.removeItem(this.USER);
  }

  logout(closeDialog) {
    this.revokeSession();
    closeDialog;
  }

}
