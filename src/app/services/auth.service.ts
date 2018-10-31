import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {UserService} from './user.service';
import {MessageService} from './message.service';

@Injectable()
export class AuthService {

  private API: string;
  private USER = 'user';

  constructor(private router: Router,
              private userService: UserService,
              private messageService: MessageService) {
    this.API = '';
  }

  signUp(userInfo, personalInfo, bankInfo) {
    firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(userInfo.email, userInfo.password)
      .then( (user) => {
        if (user) {
          firebase.auth().currentUser.updateProfile({
            displayName: userInfo.displayName,
            photoURL: ''
          }).then(() => {
              this.userService.savePersonalInfo(personalInfo, false);
              this.userService.saveBankInfo(bankInfo, false);
              this.messageService.showSuccess('Registrado com sucesso!!');
            }
          );
        }
      })
      .catch(error => console.log(error));
  }

  emailIsValid(email) {
    return firebase.auth().fetchProvidersForEmail(email);
  }

  login(user) {
    firebase.auth().signInAndRetrieveDataWithEmailAndPassword(user.email, user.password)
      .then((user) => {
        this.setSession(user);
        this.messageService.showSuccess('Login realizado com sucesso!!');
      }, () => this.messageService.showError('E-mail ou senha incorreta'));
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

  logout() {
    this.revokeSession();
  }

}
