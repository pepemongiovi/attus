import { Injectable } from '@angular/core';
import {PersonalInfo} from '../models/personalInfo.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import {BankInfo} from '../models/bankInfo.model';
import { Http } from '@angular/http';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserService {
  private API: string;

  constructor(private http: HttpClient,
              private afAuth: AngularFireAuth,
              private afDababase: AngularFireDatabase) {
  }

  sendEmail(projectName, quotas, investmentValue) {
    const url = 'https://us-central1-attus-4fdcb.cloudfunctions.net/httpEmail';
    const currentUser = JSON.parse(localStorage.getItem('user')).user;
    let info = {
      name: currentUser.displayName, email: currentUser.email,
      quotas: quotas, projectName: projectName, investmentValue: investmentValue
    };

    this.getPersonalInfo().on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        info = this.jsonConcat(info, snapshot.val());
        this.getBankInfo().on('value', (snapshot2) => {
          if (snapshot2.val() !== null) {
            info = this.jsonConcat(info, snapshot2.val());
            this.http.post(url, info).subscribe();
          }
        });
      }
    });
  }

  private jsonConcat(o1, o2) {
    for (var key in o2) {
      o1[key] = o2[key];
    }
    return o1;
  }

  savePersonalInfo(personalInfo: PersonalInfo) {
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDababase.object(`personalInfo/${auth.uid}`).set(personalInfo);
    });
  }

  getPersonalInfo() {
    const currentUser = JSON.parse(localStorage.getItem('user')).user;
    return firebase.database().ref('/personalInfo/' + currentUser.uid);
  }

  saveBankInfo(bankInfo: BankInfo) {
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDababase.object(`bankInfo/${auth.uid}`).set(bankInfo)
        .then(() => console.log('saved!'));
    });
  }

  getBankInfo() {
    const currentUser = JSON.parse(localStorage.getItem('user')).user;
    return firebase.database().ref('/bankInfo/' + currentUser.uid);
  }

  saveUserInfo(currentUser) {
    firebase.auth().currentUser.updateEmail(currentUser.email);
    firebase.auth().currentUser.updateProfile({
      displayName: currentUser.displayName,
      photoURL: null
    });

  }
}
