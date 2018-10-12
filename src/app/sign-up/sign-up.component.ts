import {Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidation } from '../shared/password-validation';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';
import {ProfileComponent} from '../initial-page/profile/profile.component';
import {MatDialogRef} from '@angular/material';
import {PersonalInfo} from '../models/personalInfo.model';
import {User} from '../models/user.model';
import {BankInfo} from '../models/bankInfo.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SignUpComponent>,
              private authService: AuthService) {}

  pageTitle = 'Dados pessoais';
  civilStatus = ['Solteiro(a)', 'Casado(a)', 'Separdo(a)', 'Divorciado(a)', 'Viúvo(a)'];
  countries = require('../../jsons/countries.json');

  bankInfo: BankInfo = new BankInfo();
  personalInfo = new PersonalInfo();
  user = new User();
  submitBtnDisabled = true;

  ngOnInit() {
    this.setDefaultInfo();
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.personalInfo.profilePicture = event.target.result;
      }
    }
  }

  numberIsValid(num) {
    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    let isValid = true;
    if (num !== undefined && (isNaN(num) || num <= 0)) {
      isValid = false;
    }
    if (num) {
      isValid = isValid && !format.test(num.toString());
    }
    return isValid ;
  }

  updateBankInfo(bankInfo: BankInfo) {
    this.bankInfo = bankInfo;
  }

  passwordIsValid() {
    const password = this.user.password;
    if (password) {
      return password.length >= 6;
    }
    return true;
  }

  passwordConfirmationIsValid() {
    const password = this.user.password;
    const passwordConfirmation = this.user.passwordConfirmation;
    if ((password === passwordConfirmation) || !passwordConfirmation) {
      return true;
    }
    return false;
  }

  textIsValid(text) {
    if(text) {
      const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
      return !format.test(text) && text.length > 0 && !(/\d/.test(text));
    }
    return true;
  }

  emailIsValid() {
    const email = this.user.email;
    if (email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
    return true;
  }

  setDefaultInfo() {
    this.personalInfo.country = this.countries[29].nome_pais;
    this.personalInfo.ddi = 55;
    this.personalInfo.birthDay = null;
  }

  phoneIsValid() {
    if(this.personalInfo.phone) {
      const valid = this.numberIsValid(this.personalInfo.phone);
      return valid && this.personalInfo.phone.toString().length > 7;
    }
    return true;
  }

  birthDayIsValid() {
    const birthDay = this.personalInfo.birthDay;
    if(birthDay===null) return true;
    return birthDay;
  }

  submitBtnIsDisabled(disabled) {
    this.submitBtnDisabled = disabled;
  }

  cpfIsValid() {
    const cpf = this.personalInfo.cpf;
    if(cpf) {
      return this.numberIsValid(parseInt(cpf, 10)) && cpf.length === 11;
    }
    return true;
  }

  nextBtnIsValid() {
    return this.user.displayName && this.user.email && this.user.password
      && this.user.passwordConfirmation && this.personalInfo.phone
      && this.personalInfo.issuingBody && this.personalInfo.rg && this.personalInfo.cpf
      && this.personalInfo.profession && this.personalInfo.country && this.personalInfo.uf
      && this.personalInfo.cep && this.personalInfo.city && this.personalInfo.address
      && this.personalInfo.number && this.personalInfo.addressComplement
      && this.personalInfo.birthDay && this.personalInfo.civilStatus && this.personalInfo.ddi &&
      this.textIsValid(this.user.displayName) && this.emailIsValid() &&
      this.passwordIsValid() && this.passwordConfirmationIsValid() &&
      this.numberIsValid(this.personalInfo.ddi) && this.phoneIsValid() &&
      this.birthDayIsValid() && this.textIsValid(this.personalInfo.issuingBody) &&
      this.numberIsValid(this.personalInfo.rg) && this.cpfIsValid() &&
      this.textIsValid(this.personalInfo.profession) && this.textIsValid(this.personalInfo.country) &&
      this.textIsValid(this.personalInfo.uf) && this.numberIsValid(this.personalInfo.cep) &&
      this.textIsValid(this.personalInfo.city) && this.textIsValid(this.personalInfo.address) &&
      this.numberIsValid(this.personalInfo.number) && this.textIsValid(this.personalInfo.addressComplement);
  }

  next() {
    this.pageTitle = 'Dados bancários (OPCIONAL)';
  }

  back() {
    this.pageTitle = 'Dados pessoais';
  }

  close() {
    this.dialogRef.close();
  }

  signUp() {
    this.authService.signUp(this.user, this.personalInfo, this.bankInfo, this.close());
  }

}
