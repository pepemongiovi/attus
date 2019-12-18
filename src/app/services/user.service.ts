import { Injectable } from '@angular/core';
import {PersonalInfo} from '../models/personalInfo.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import {BankInfo} from '../models/bankInfo.model';
import { Http } from '@angular/http';
import {HttpClient} from '@angular/common/http';
import {InvestmentInfo} from '../models/investmentInfo.model';
import {MessageService} from './message.service';
import {formatDate} from 'tough-cookie';

@Injectable()
export class UserService {
  private API: string;
  personalInfo;
  bankInfo;

  constructor(private http: HttpClient,
              private afAuth: AngularFireAuth,
              private afDababase: AngularFireDatabase,
              private messageService: MessageService) {
  }

  sendEmail(investmentInfo: InvestmentInfo) {
    const url = 'https://us-central1-attus-4fdcb.cloudfunctions.net/httpEmail';
    const currentUser = JSON.parse(localStorage.getItem('user')).user;
    let info = {
      name: currentUser.displayName, email: currentUser.email, quotaValue: investmentInfo.quotaValue,
      quotas: investmentInfo.quotas, projectName: investmentInfo.project, investmentValue: investmentInfo.value
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

  formatDate(dateString) {
    const date = new Date(dateString);
    const formatedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    return formatedDate;
  }

  savePersonalInfo(personalInfo: PersonalInfo, showMessage = true) {
    personalInfo.birthDay = this.formatDate(personalInfo.birthDay);
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDababase.object(`personalInfo/${auth.uid}`).set(personalInfo)
        .then(() => {
          if(showMessage) {
            this.messageService.showSuccess('Salvo com sucesso!!')
          }
        });
    });
  }

  saveInvestmentInfo(investmentInfo, investments) {
    this.afAuth.authState.take(1).subscribe(auth => {
      if (investments === null) investments = [investmentInfo];
      else investments.push(investmentInfo);
      this.afDababase.object(`investments/${auth.uid}`).set(investments)
        .then(() => {
          this.sendEmail(investmentInfo);
          this.messageService.showSuccess('Investimento realizado com sucesso!');
        });
    });
  }

  saveInvestments(uid, investments) {
    this.afDababase.object(`investments/${uid}`).set(investments)
      .then(() => this.messageService.showSuccess('Salvo com sucesso!!'));
  }

  saveBankInfo(bankInfo: BankInfo, showMessage = true) {
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDababase.object(`bankInfo/${auth.uid}`).set(bankInfo)
        .then(() => {
          if (showMessage) {
            this.messageService.showSuccess('Salvo com sucesso!!');
          }
        }).catch((error) => console.log(error));
    });
  }

  saveUserInfo(currentUser) {
    firebase.auth().currentUser.updateEmail(currentUser.email);
    firebase.auth().currentUser.updateProfile({
      displayName: currentUser.displayName,
      photoURL: null
    });
  }

  getPersonalInfo() {
    const currentUser = JSON.parse(localStorage.getItem('user')).user;
    return firebase.database().ref('/personalInfo/' + currentUser.uid);
  }

  getBankInfo() {
    const currentUser = JSON.parse(localStorage.getItem('user')).user;
    return firebase.database().ref('/bankInfo/' + currentUser.uid);
  }

  getInvestments() {
    const currentUser = JSON.parse(localStorage.getItem('user')).user;
    return firebase.database().ref('/investments/' + currentUser.uid);
  }

  getInvestmentsByUID(userUID) {
    return firebase.database().ref('/investments/' + userUID);
  }

  getUserByEmail(emailAddress) {
    const url = 'https://us-central1-attus-4fdcb.cloudfunctions.net/getUserByEmail';
    return this.http.post(url, {email: emailAddress});
  }
}
